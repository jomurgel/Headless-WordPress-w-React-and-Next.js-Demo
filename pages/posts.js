import Head from 'next/head'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import React, { Component } from 'react'
import axios from 'axios';
import { Fragment } from 'react'

export default class extends Component {

  // Resolve promis and set initial props.
  static async getInitialProps() {

    // Make request for posts.
    const response = await axios.get( 'http://wordpress.test/wp-json/wp/v2/posts')

    // Return response to posts object in props.
    return {
      posts: response.data
    }
  }

  render() {
    return (
      <Fragment>
        <Head>
          <title>This is our posts page!</title>
          <meta name="description" content="This is an example of a meta description. This will show up in search results." />
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Navigation/>
        <h1>Our Posts Page!</h1>
        <ul>
          {
            this.props.posts.map( post => {
              return (
                <li key={ post.id }>
                  <Link href={ `/posts/${ post.slug }` }>
                    <a href={ `/posts/${ post.slug }` }>
                      { post.title.rendered }
                    </a>
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </Fragment>
    )
  }
}
