import { useRouter } from 'next/router';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';

import {FiUser, FiCalendar, FiClock}  from "react-icons/fi"
import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

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

export default function Post({ post }: PostProps): JSX.Element {

  const totalWords = post.data.content.reduce((total, contentItem) => {
    total += contentItem.heading.split(' ').length;

    const words = contentItem.body.map(item => item.text.split(' ').length);
    words.map(word => (total += word));
    return total;
  }, 0);
  const readTime = Math.ceil(totalWords / 200);

  const router = useRouter();

    if(router.isFallback){
      return <h1>Carregando...</h1>
    }

  return(

    <>

      <Head>
        <title>{post.data.title}</title>
      </Head>
      
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
                  <span>{`${readTime} min`}</span>
              </div>

              
              {post.data.content.map( content => {
                  return( 
                        <div key={content.heading}>
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
    </>  
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query([Prismic.Predicates.at('document.type', 'posts'),
]);

const paths = posts.results.map(post => {
  return {
    params: {
      slug: post.uid,
    },
  };
});

  return {
    paths,
    fallback: true,
  }
};

export const getStaticProps: GetStaticProps = async context => {
  const prismic = getPrismicClient();
  const { slug } = context.params;
  const response = await prismic.getByUID('posts', String(slug), {});

  const post = {
    uid: response.uid,
    first_publication_date: format(
      new Date(response.first_publication_date),
      "dd MMM yyyy",
      {
        locale: ptBR,
      }
    ),
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
