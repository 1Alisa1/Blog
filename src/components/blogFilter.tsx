import { useState } from 'react';

interface Filter {
  post: string;
  latest: boolean;
}

interface BlogFilterProps {
  setSearchParams: (params: {}) => void;
  postQuery: string;
  latest: boolean;
}

const BlogFilter = ({setSearchParams, postQuery, latest}: BlogFilterProps) => {
  const [search, setSearch] = useState(postQuery);
  const [checked, setChecked] = useState(latest);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const query = form.search.value;
    const isLatest = form.latest.checked;

    const params = {} as Filter;

    if (query.length) params.post = query;
    if (isLatest) params.latest = true;

    setSearchParams(params);
  }

  return (
    <form className='search' autoComplete='off' onSubmit={handleSubmit}>
        <input type='search' name='search' value={search} onChange={e => setSearch(e.target.value)}/>
        <label>
          <input type='checkbox' name='latest' checked={checked} onChange={e => setChecked(e.target.checked)}/>New only
        </label>
        <input type='submit' value='search' />
    </form>
  );
}

export default BlogFilter;