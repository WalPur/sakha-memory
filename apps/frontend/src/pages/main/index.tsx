const MainPage = () => {
    return (
        <main>
            <section
                style={{
                    backgroundColor: "#4998F2",
                    height: "372px",
                    backgroundImage: `url("ornament.png")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right top",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        justifyContent: "center",
                        maxWidth: "1400px",
                        height: "100%",
                        margin: "auto",
                    }}
                >
                    <h1
                        style={{
                            fontSize: "36px",
                            fontWeight: 400,
                            margin: 0,
                        }}
                    >
                        Ваша дверь в Память Якутии
                    </h1>
                    <p
                        style={{
                            fontSize: "16px",
                            maxWidth: "790px",
                            fontWeight: 500,
                            margin: 0,
                        }}
                    >
                        Портал «Память Якутии» - это информационный продукт, результат реализации программы «Память
                        Якутии» (2002-2006 гг.), утвержденной постановлением Правительства Республики Саха (Якутия) №
                        116 от 2 марта 2001 г. Основная цель программы - сохранение документального наследия народов
                        Якутии как части мирового культурного наследия и обеспечение доступа к нему на основе
                        современных информационных технологий.
                    </p>
                </div>
            </section>
            <section style={{ backgroundColor: "#fff", padding: "60px 0" }}>
                <div
                    style={{
                        maxWidth: "1400px",
                        height: "100%",
                        margin: "auto",
                        color: "#000",
                    }}
                >
                    <h2 style={{ fontSize: "36px", marginTop: 0, marginBottom: 40, fontWeight: 400 }}>
                        Портал «Память Якутии»
                    </h2>
                    <p>
                        Портал «Память Якутии» предоставляет свободный доступ к ценным и редким документам из фондов
                        Национальной библиотеки Республики Саха (Якутия), Национального архива Республики Саха (Якутия),
                        Государственного объединенного музея истории и культуры народов Севера им. Е. М. Ярославского,
                        Государственного национального хранилища кинодокументов о Республике Саха (Якутия). Для
                        зарубежных пользователей разработана версия на английском языке (Eng. version).
                    </p>
                    <p>
                        Книжные памятники Якутии представлены электронными копиями оригиналов первых книг на якутском
                        языке, наиболее ценных дореволюционных изданий о Якутии. Материал сопровождается научными
                        комментариями по истории якутской книги, опубликован полный репертуар якутской книги за
                        1812-1916 гг. В разделе Национальная библиография Республики Саха (Якутия) представлены основные
                        библиографических пособий о Якутии, среди которых «Библиография Якутии» Н.Н. Грибановского,
                        «Летопись печати Якутии» и др.
                    </p>
                    <p>
                        Уникальные и особо ценные документы архивного фонда Республики Саха (Якутия) знакомят с
                        документами Якутской воеводской канцелярии (1701-1823), Якутской провинциальной канцелярии
                        (1778-1892), Якутского канцелярского комиссара (1766), Якутской Степной Думы (1827-1860),
                        Якутского губернатора (1862-1919), Якутского областного управления (1805-1909), Якутского
                        областного стряпчего (1815-1851), Якутского областного по городским делам присутствия, а также с
                        документальными памятниками общественно-политической мысли Якутии XVIII-XX вв.
                    </p>
                    <p>
                        Фотолетопись Якутии представляют фотографии конца XIX – начала XX вв., отражающие наиболее
                        значимые события и факты из истории и культуры Якутии. Работа велась по следующим тематическим
                        блокам: общественно-политическая жизнь края, культурная жизнь Якутии, промышленность и торговля
                        в Якутии, традиционные виды хозяйства народов Якутии, земледелие Якутии, образование и
                        здравоохранение Якутии, история ссылки, научные экспедиции, православие Якутии, традиционные
                        верования Якутии и др.
                    </p>
                    <p>
                        В разделе Кинолетопись Якутии представлено 60 фильмов из фондов Государственного национального
                        хранилища кинодокументов о Республике Саха (Якутия), раскрывающие различные периоды истории и
                        культуры Якутии. Значительная часть фильмов является уникальной и ценной по своей исторической и
                        культурной значимости, что представляет большой интерес не только для населения республики, но и
                        российского и зарубежного потребителя. Редкие кадры кинохроники собраны в коллекциях «Олонхо»,
                        «Якутские алмазы», «Река Лена» и др.
                    </p>
                    <p>
                        «Голоса века»: музыкальное и звуковое наследие народов Республики Саха (Якутия)” представляют
                        редкие записи якутской музыки и фольклора в исполнении мастеров народного творчества
                        (олонхосутов, тойуксутов, хомусистов) и артистов.
                    </p>
                    <p>
                        Портал «Память Якутии» призван способствовать распространению знаний об истории и богатом
                        культурном наследии Якутии, формированию положительного имиджа Республики Саха (Якутия) в России
                        и за рубежом.
                    </p>
                </div>
            </section>
        </main>
    );
};
export default MainPage;
