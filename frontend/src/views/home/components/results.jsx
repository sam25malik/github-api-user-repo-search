import React from "react";
import { useSelector } from 'react-redux'
import {Grid, Segment, Image} from "semantic-ui-react";

/*Results component that has results grid*/
const Results = ({}) => {
    	const {results,type} = useSelector(state => state.data);
    	
    	const resultGrid = (resultData) => {
	        let items = [];
	        for (let i = 0; i < resultData.length; i++) {
	            var user_data; 
	            if(type=='repositories'){
	        		user_data=resultData[i].owner;	
	        	}else{
	        		user_data=resultData[i]
	        	}
	             if(user_data){
	             let temp = (
	               <Grid.Column className="results-grid" key={i}>
	                	<Segment>
	                       <Image src={user_data.avatar_url} height='300px'/>
	                       <h2>User Name: {user_data.login}</h2>
	                       <a href={user_data.html_url}>User Link: {user_data.html_url}</a>
			               {type=='repositories' ? 
			               		(<div>
			               			<p>Repo Name: {resultData[i].name}</p>
			               			<p>Description: {resultData[i].description}</p>
			               			<p>Stars: {resultData[i].stargazers_count}</p>
			               			<p>Forks: {resultData[i].forks_count}</p>
			               			<p>Watchers: {resultData[i].watchers_count}</p>
			               			<p>Open Issues: {resultData[i].open_issues}</p>
			               		</div>	
			               		):''
	           				}
	                	</Segment>
	                </Grid.Column>

	        );
	        	items.push(temp);
        	} 
        	}
        	return items;
		}
         
        return(<div>
               		{results ? (<Grid columns={3}>{resultGrid(results)}</Grid>): 
						(<div style={{'marginLeft':'-80px'}}>No results</div>)
               		}	
                </div>);
               }

export default Results;