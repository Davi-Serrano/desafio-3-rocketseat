import { GetStaticPaths, GetStaticProps } from 'next';
import { getPrismicClient } from '../../services/prismic';

import {FiUser, FiCalendar, FiClock}  from "react-icons/fi"

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { RichText } from 'prismic-dom';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  
  return(
    <div className={styles.container}>
         
            <img className={styles.image} src={post.data.banner.url} alt="imagem" />


          <article>

            <div>
                <h2>{post.data.title}</h2>
                
                <FiUser />
                <span>{post.first_publication_date}</span>
              
                <FiCalendar />
                <span>{post.data.author}</span>
              
                <FiClock />
                <span>4min</span>
            </div>

            {post.data.content.map( content => {
                return( 
                      <div>
                        <h3>{content.heading} </h3>

                        <div 
                        dangerouslySetInnerHTML={{
                          __html: RichText.asHtml(content.body),
                        }}
                        >
                        </div>
                       
                      </div> 
              
                )
              })}

          

          </article>

    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const prismic = getPrismicClient();
  // const posts = await prismic.query(TODO);

  return {
    paths:[],
    fallback: true,
  }
};

export const getStaticProps: GetStaticProps = async context => {
  const prismic = getPrismicClient();
  const { slug } = context.params;
  const response = await prismic.getByUID('posts', String(slug), {});

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data : {
      title: response.data.title,
      subtitle: response.data.subtitle,
      author: response.data.author,
      banner: {
        url: response.data.banner.url,
      },
      content: response.data.content.map(content => {
        return {
          heading: content.heading,
          body:[...content.body],
        };
      }),
    },
  };
    return {
      props: {
        post,
      }
    };

};
