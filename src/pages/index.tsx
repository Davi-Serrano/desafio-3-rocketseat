import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
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

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
