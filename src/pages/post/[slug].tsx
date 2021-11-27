import { GetStaticPaths, GetStaticProps } from 'next';
import { getPrismicClient } from '../../services/prismic';

import {FiUser, FiCalendar, FiClock}  from "react-icons/fi"

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

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

export default function Post() {
  return(
        <div className={styles.container}>
          <div className={styles.image}>
            <h1>Aqui vai a imagem</h1>
          </div>

          <article>

            <div>
                <h2>Aqui vai o titulo bla bla bla</h2>
                
                <FiUser />
                <span>15 Mar 2021</span>
              
                <FiCalendar />
                <span>Davi Serrano</span>
              
                <FiClock />
                <span>4min</span>
            </div>

            <div>
              <h3>Aqui vai o titulo bla bla bla  </h3>

              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus nihil numquam pariatur ab modi debitis, vero ipsa porro earum totam sunt, enim accusantium quod alias assumenda eius minus, sit nulla.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis nulla debitis incidunt autem perferendis voluptatem distinctio earum nesciunt, nostrum aperiam recusandae unde, nisi pariatur excepturi vel quasi quod eius asperiores?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora voluptas ab autem consequatur, doloremque iste ipsum minus accusamus dicta recusandae repellat quasi. Quod officiis nemo amet tempore facere culpa. At!

              </p>

            </div>  

            <div>
              <h3>Aqui vai o titulo bla bla bla  </h3>

              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus nihil numquam pariatur ab modi debitis, vero ipsa porro earum totam sunt, enim accusantium quod alias assumenda eius minus, sit nulla.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis nulla debitis incidunt autem perferendis voluptatem distinctio earum nesciunt, nostrum aperiam recusandae unde, nisi pariatur excepturi vel quasi quod eius asperiores?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora voluptas ab autem consequatur, doloremque iste ipsum minus accusamus dicta recusandae repellat quasi. Quod officiis nemo amet tempore facere culpa. At!

              </p>

            </div>  

            <div>
            </div>    


          </article>

    </div>
  )
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient();
//   const posts = await prismic.query(TODO);

//   // TODO
// };

// export const getStaticProps = async context => {
//   const prismic = getPrismicClient();
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
