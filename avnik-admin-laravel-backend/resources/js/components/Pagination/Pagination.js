import React from 'react';
import { Redirect } from 'react-router-dom';
class Pagination {
 
  NextPageURl(nextPage){
    
    let next_page_url=nextPage!=null?nextPage.split('?page=')[1]:null;
    
    next_page_url=next_page_url!=null?`?page=${parseInt(next_page_url)}`:'' 
    console.log(next_page_url);

    return next_page_url;

  }
  PreviewsPageURL(previewsPage){
    
    let prev_page_url=previewsPage!=null?previewsPage.split('?page=')[1]:null;
    prev_page_url=prev_page_url!=null?`?page=${parseInt(prev_page_url)}`:'' 
    return prev_page_url;
  }
  CurrentPageURL(currentPage){
  let current_page_url=currentPage!=null?currentPage.split('?page=')[1]:null;
    current_page_url=current_page_url!=null?`?page=${parseInt(current_page_url)}`:'' 
    return current_page_url;
  }

}

export default new Pagination();
