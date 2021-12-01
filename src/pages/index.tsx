import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';
import Prismic from "@prismicio/client";
import { RichText} from "prismic-dom"

import styles from './home.module.scss';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import {FiUser, FiCalendar}  from "react-icons/fi"
import { previousSunday } from 'date-fns/esm';

format(
	new Date(),
	"'Hoje é' eeee",
	{
		locale: ptBR,
	}
)

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

export default function Home({postsPagination}: HomeProps ) {
  console.log(postsPagination)
  return(
    <main className={styles.container}>

          {postsPagination.results.map(post => (
         
         <section key={post.uid}>     
            <a href="#"> <h2>{post.data.title} </h2> </a>
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
    pageSize: 20,
})

  const postnextpage = postResponse.next_page;

  const postsPagination = postResponse.results.map(post => {
    return{
      next_page: postnextpage,
      results: {
        uid: post.uid,
        first_publication_date: post.first_publication_date,
        data: {
          title: post.data.content[0].heading,
          subtitle: post.data.content[0].heading,
          author: post.data.content[0].heading,
        }
      }
    }
  })



  console.log(postsPagination)
  console.log(JSON.stringify( postResponse, null, 2))

return{
  props:{
    postsPagination
  }
}

};
