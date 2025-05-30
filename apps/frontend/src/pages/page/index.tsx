import { useGetPageIdQuery } from "@/entities/page";
import BreadCrumb from "@/shared/ui/BreadCrumb";
import { Loading } from "@/shared/ui/Loading";
import { Image } from "antd";
import { useParams } from "react-router-dom";

const PagePage = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetPageIdQuery(id!);
    return (
        <main style={{ maxWidth: "1400px", margin: "auto", padding: "40px 0 80px 0", color: "#000" }}>
              {isLoading || !data ? (
    <Loading />
  ) : (
    <>
      <BreadCrumb items={data.breadcrumb} />
      {["GALLERY_CATEGORY", "VIDEO_CATEGORY", "BOOK_CATEGORY"].includes(data.type) ? (
        <ul>
          {data.children?.map((child) => (
            <li key={child.id}>
              <a href={child.id.toString()}>{child.name}</a>
            </li>
          ))}
        </ul>
      ) : data.type === "GALLERY" ? (
        <div>
          {data.files?.map((item) => (
            <Image key={item.id} width={200} src={item.file} />
          ))}
        </div>
      ) : data.type === "VIDEO" ? (
        <video controls>
          <source src={data.files[0].file} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : data.type === "BOOK" ? (
        // <div dangerouslySetInnerHTML={{ __html: data.content }} />
        <iframe src={data.files[0].file} title={data.name} />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
      )}
    </>
  )}
        </main>
    );
};

export default PagePage;
