import react, {useCallback, useEffect, useState} from 'react'
import http from '../helpers/http';
import {debounce} from 'lodash'
import { Table } from './Table';


export const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [termSearch, setTermSearch] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [data, setData] = useState({})
  const debouncedTime = 500 // in ms

  // shortcut to know if data is available
  let isDataAvailable = Object.keys(data) && data?.resultCount > 0;

  const fetcher = (term) => {
    setIsLoaded(false)
    setIsSearching(true)
    http(`https://itunes.apple.com/search?term=${term}&music=musicTrack&limit=100`, setData)

  }
  // exercice ask for a call by typing but iTunes WS limiting api call by 20 request by minute, 
  // so write a debounced function to handle that and trigger call only when user stop typing for minium 500ms (debouncedTime variable)
  const debouncedQuery = useCallback(debounce(term => fetcher(term), debouncedTime), []);

  const handleSearch = (event) => {
    const {value} = event.target;
    setTermSearch(value)
    debouncedQuery(value)
  }


  useEffect(() => {
    if( Object.keys(data).length){
      setIsLoaded(true)
      setIsSearching(false)
    }
  }, [data])

  return (
    <section className="home">
      <h1>iTunes Music Searcher</h1>
      <input type='text' onChange={handleSearch} />
      {
        !isLoaded ? <p>Please type a filter...</p> : null
      }
      {
        isSearching ? <p>Searching for {termSearch}</p> : null
      }
      {
        isDataAvailable 
           ? <Table data={data?.results} />
           : null
      }

    </section>
  );
}
