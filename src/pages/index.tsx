import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';
import Prismic from "@prismicio/client";
import { RichText} from "prismic-dom"

import styles from './home.module.scss';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import {FiUser, FiCalendar}  from "react-icons/fi"

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

export default function Home() {
  return(
    <main className={styles.container}>

        <section>
          <h2>Como utilizar Hooks </h2>
          <p>Pensando em sincronização em vez de circulo de vida </p>

          <div className={styles.creator}>
            <div> <FiCalendar />  29/01/2002 </div>
            <div> <FiUser /> Davi Serrano</div>
          </div>

        </section>

        <section>
          <a href="#"> <h2>Como utilizar Hooks </h2> </a>
          <p>Pensando em sincronização em vez de circulo de vida </p>

          <div className={styles.creator}>
            <div> <FiCalendar />  29/01/2002 </div>
            <div> <FiUser /> Davi Serrano</div>
          </div>

        </section>

        <section>
          <h2>Como utilizar Hooks </h2>
          <p>Pensando em sincronização em vez de circulo de vida </p>

          <div className={styles.creator}>
            <div> <FiCalendar />  29/01/2002 </div>
            <div> <FiUser /> Davi Serrano</div>
          </div>

        </section>


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

  const posts = postResponse.results.map(post => {
    return{
      slug: post.uid,
      title: post.data.slug,
    }
  })



  console.log(posts)
  console.log(JSON.stringify( postResponse, null, 2))

return{
  props:{}
}

};
