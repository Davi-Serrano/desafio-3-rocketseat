import { GetStaticProps } from 'next';

import React, { useState } from 'react';
import  Head  from 'next/head';

import Prismic from "@prismicio/client";
import { getPrismicClient } from '../services/prismic';
import { RichText} from "prismic-dom"

import styles from './home.module.scss';
import {FiUser, FiCalendar}  from "react-icons/fi"

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';



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
  const [nextPage, setNextPage ] = useState(postsPagination.next_page)
  const [currentPage, setCurrentPage] = useState(1) 
 
 async function handleNextPage(): Promise<void>{
   if(currentPage != 1 && nextPage === null){
     return;
   }

   const postResults = await fetch(`${nextPage}`)
    .then( response => response.json()
    );

    setNextPage(postResults.next_page);
    setCurrentPage(postResults.next_page);

    const newPosts = postResults.results.map(post => {
      return {
        uid: post.uid,
        first_publication_date:format(
          new Date(post.first_publication_date),
          "dd MMM yyyy",
          {
            locale: ptBR,
          }
        ),
        data: {
          title: post.data.title,
          subtitle: post.data.subtitle,
          author: post.data.author,
        },
      }
    })

    setPost([...posts, ...newPosts])

 }
 
  return(
    <>
      <Head>
        <title>Home | SpaceTravelling</title>
      </Head>
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

        {nextPage && ( <button
        type="button"
        onClick={handleNextPage}
        >Carregar mais posts</button>)}
    
    </main>
    </>
  )
}

export const getStaticProps = async () => {
  const prismic = getPrismicClient();

  const postResponse = await prismic.query([
    Prismic.predicates.at('document.type', 'posts')],
    {
      pageSize: 1,
    }
);

  const posts = postResponse.results.map(post => {
    
    return {
        uid: post.uid,
        first_publication_date: post.first_publication_date,
        data: {
          title: post.data.title,
          subtitle: post.data.subtitle,
          author: post.data.author,
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
