import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';
import Prismic from "@prismicio/client";
import { RichText} from "prismic-dom"

import styles from './home.module.scss';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import {FiUser, FiCalendar}  from "react-icons/fi"
import { previousSunday } from 'date-fns/esm';
import { useState } from 'react';



interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({postsPagination}: HomeProps ): JSX.Element{

  const formattedPost = postsPagination.results.map(post =>{
    return{
      ...post,
      first_publication_date: format(
        new Date(post.first_publication_date),
        "dd MMM yyyy",
        {
          locale: ptBR,
        }
      )
    }
  })

  const [posts, setPost] = useState<Post[]>(formattedPost);

  return(
    <main className={styles.container}>

          {posts.map(post => (
         
         <section key={post.uid}>     
            <a href={`/post/${post.uid}`}><h2>{post.data.title} </h2> </a>
            <p>{post.data.subtitle} </p>

            <div className={styles.creator}>
              <div> <FiCalendar />  {post.first_publication_date} </div>
              <div> <FiUser /> {post.data.author}</div>
            </div>

        </section>
          ))}

        <button>Carregar mais post...</button>
    
    </main>
  )
}

export const getStaticProps = async () => {
  const prismic = getPrismicClient();

  const postResponse = await prismic.query([
    Prismic.predicates.at('document.type', 'posts')
],{
    fetch: ['posts', 'posts.content'],
    pageSize: 10,
})

  const posts = postResponse.results.map(post => {
    
    return {
        uid: post.uid,
        first_publication_date: post.first_publication_date,
        data: {
          title: post.data.content[0].heading,
          subtitle: post.data.content[0].heading,
          author: post.data.content[0].heading,
        },
      };
  });


  const postsPagination = {
    next_page: postResponse.next_page,
    results: posts
  } 

  return{
    props:{
      postsPagination
    }
  }

};
