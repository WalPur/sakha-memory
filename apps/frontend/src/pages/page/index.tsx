import { useGetPageIdQuery } from "@/entities/page";
import BreadCrumb from "@/shared/ui/BreadCrumb";
import { Loading } from "@/shared/ui/Loading";
import { Image } from "antd";
import styles from "./style.module.css";
import { useParams, Navigate } from "react-router-dom";

const PagePage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetPageIdQuery(id!);
  if (id === "1") {
    return <Navigate to="/" replace />;
  }
  const category_names = [
    "GALLERY_CATEGORY",
    "VIDEO_CATEGORY",
    "BOOK_CATEGORY",
    "AUDIO_CATEGORY",
    "CATEGORY",
    "SECTION",
  ];
  const media_names = ["GALLERY", "VIDEO", "BOOK", "AUDIO"];
  return (
    <main
      style={{
        maxWidth: "1400px",
        margin: "auto",
        padding: "40px 20px 80px 20px",
        color: "#000",
      }}
    >
      {isLoading || !data ? (
        <Loading />
      ) : (
        <>
          <BreadCrumb items={data.breadcrumb} />
          {data.type !== "PAGE" ? <h1>{data.name}</h1> : null}
          {category_names.includes(data.type) ? (
            <ul>
              {data.children?.map((child) => (
                <li key={child.id}>
                  {(child.has_inside_file &&
                    media_names.includes(child.type)) ||
                  child.type === "PAGE" ||
                  category_names.includes(child.type) ? (
                    <a href={child.id.toString()}>{child.name}</a>
                  ) : (
                    <span>{child.name}</span>
                  )}
                </li>
              ))}
            </ul>
          ) : data.type === "GALLERY" ? (
            <div className={styles["content-media-gallery"]}>
              <Image.PreviewGroup
                preview={{
                  onChange: (current, prev) =>
                    console.log(
                      `current index: ${current}, prev index: ${prev}`
                    ),
                }}
              >
                {data.files?.map((item) => (
                  <Image
                    key={item.id}
                    width={200}
                    height={200}
                    src={item.file}
                  />
                ))}
              </Image.PreviewGroup>
            </div>
          ) : data.type === "VIDEO" ? (
            <div className={styles["content-media"]}>
              {data.files?.map((item) => (
                <video controls>
                  <source src={item.file} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ))}
            </div>
          ) : data.type === "BOOK" ? (
            <div className={styles["content-media-book"]}>
              {data.files?.map((item) => (
                <iframe
                  className={styles["content-media-book-iframe"]}
                  src={item.file}
                  title={data.name}
                />
              ))}
            </div>
          ) : data.type === "AUDIO" ? (
            <div className={styles["content-media"]}>
              {data.files?.map((item) => (
                <audio controls>
                  <source src={item.file} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              ))}
            </div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          )}
        </>
      )}
    </main>
  );
};

export default PagePage;
