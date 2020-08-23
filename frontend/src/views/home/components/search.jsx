import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import {Input,Dropdown,Icon,Button} from "semantic-ui-react";
import _ from 'lodash';
import {searchGit,setType,setResults,clearCache} from '../actions/index';

/*Search component that has Input and Dropdown*/
const Search = ({}) => {
    const drop = [{'key':'Users','value':'users','text':'Users'},{'key':'Repo','value':'repositories','text':'Repo'}];   
    const {inputValue,type} = useSelector(state => state.data);

    const dispatch = useDispatch();
    useEffect(() => {
       if(inputValue.length<3){
          dispatch(setResults(''));
       }
    },[inputValue]); 

    const onChangeSearch = event => {
        let inputValue = event.target.value;
        dispatch(searchGit(event.target.value,type));
     };

     const onChangeType = (event, data) => {
        dispatch(setType(data.value));
        if(inputValue.length>=3){
            dispatch(searchGit(inputValue));
        }
     };

     const onClearCache = (event, data) => {
        dispatch(clearCache());
     };

    return (    
        <>
          <div className="container">
            <Icon size='huge' name='github' className="imageStyle"/>
            <div className="textStyle">
            <h2>Github Searcher</h2>
          	<p className="paraStyle">Search users or repositories below</p>
        		</div>
            <Input 
                  placeholder="Start typing to search .." 
                  onChange={onChangeSearch} 
                  autoComplete="off"
                  style={{'width':'250px','marginLeft':'-50px'}}
                 	value={inputValue}
            />
            <Dropdown 
               	  selection
                  options = {drop}
                  className='dropdown-search'
                  compact
                  onChange={onChangeType}
                  value={type}/>
       		  	</div>
             <Button onClick={onClearCache} className='cache-btn'>Clear Cache</Button>
 		</>);
}


export default Search;