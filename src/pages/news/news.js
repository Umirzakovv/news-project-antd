import { Layout, List, Pagination, Spin } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import Container from "../../components/container/container";
import Header from "../../components/header/header";
import NewsItem from "../../components/news-item/news-item";

const News = () => {

  const [data, setData] = useState();
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=2&page=${activePage}`, {
      headers: {
        Authorization: "7605e7c428194b64ada6b42a814f5462",
      },
    })
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      setData(data)
      setLoading(false)
    })
    
  }, [activePage])

  const handlePaginationClick = (changedPage) => {
    setActivePage(changedPage)
  }

  return(
    <Layout>
      <Header />
      <Content>
        <Container>
          <List>
            {!loading && data && data?.articles.map((article) => (
            <NewsItem key={article.id} article={article} />
            ))}
            {loading && <Spin />}
          </List>
            {!loading && (
              <Pagination
              style={{margin: "0 auto", width: "max-content" }}
              onChange={handlePaginationClick} 
              pageSize={2} 
              current={activePage} 
              total={data?.totalResults} />
            )}
        </Container>
      </Content>
    </Layout>
  );
};

export default News;