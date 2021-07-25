import './SortBox.css';

const SortBox = props =>{

  return(
    <div className='productSortBottom'>
    <span>Sort By</span>
    {window.innerWidth<=500 &&<a onClick={()=>props.setSortBox(!props.sortBox)} className="filterBoxCloseMobile" >&times;</a>}
    <button className={props.getClassName('popularity')} onClick={()=>props.sortHandler('popularity')}>Popularity</button>
    <button className={props.getClassName('product_rating DESC')} onClick={()=>props.sortHandler('product_rating DESC')}>Rating</button>
    <button className={props.getClassName('discounted_price ASC')} onClick={()=>props.sortHandler('discounted_price ASC')}>Price -- Low to High</button>
    <button className={props.getClassName('discounted_price DESC')} onClick={()=>props.sortHandler('discounted_price DESC')}>Price -- High to Low</button>
  </div>
  );
}

export default SortBox;