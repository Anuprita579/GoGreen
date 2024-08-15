import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
//MUI ICONS
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './commonStyle.scss';

const BreadCrumbs = ({ paths, color }) => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    if (path.customOnClick) {
      path.customOnClick();
    } else {
      navigate(path.url);
    }
  };
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumbs">
        {paths.map((path, index) => (
          <>
            <li key={index} className="breadcrumb-item">
              {path.customOnClick ? (
                <span
                  onClick={() => handleClick(path)}
                  style={{ color, cursor: 'pointer' }}
                >
                  {path.label}
                </span>
              ) : (
                <Link to={path.url} style={{ color }}>
                  {path.label}
                </Link>
              )}
              {index < paths.length - 1 && (
                <ArrowForwardIosIcon style={{ fill: color }} className="breadcrumb-icon" />
              )}
            </li>
          </>
        ))}
      </ol>
    </nav>
  );
};



export default BreadCrumbs;

// NOTE
// while use breadcrumbs componen make sure to use paths like an array
// const paths = [
//     { label: 'Home', url: '/' },
//     { label: 'Products', url: '/products' },
//     { label: 'Category', url: '/products/category' },
//     { label: 'Product Details', url: '/products/category/product-details' }
//   ];

// and then directly render the compoent as
// <div className="App">
// <Breadcrumbs paths={paths} />
// </div>