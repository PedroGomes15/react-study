import { Component } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 12,
    searchValue: '',
  };

  async componentDidMount() {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  }

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !searchValue
      ? posts
      : allPosts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        });

    return (
      <section className='container'>
        <div className='search-container'>
          <TextInput
            searchValue={searchValue}
            handleChange={this.handleChange}
          />

          {!!searchValue && <p>Search value: {searchValue}</p>}
        </div>
        {filteredPosts.length > 0 ? <Posts posts={filteredPosts} /> : <p>Não existem posts</p>}

        <div className='button-container'>
          {!searchValue && (
            <Button
              text='Load More Posts'
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            ></Button>
          )}
        </div>
      </section>
    );
  }
}

export default Home;
