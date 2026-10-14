import React from 'react';
import { NavLink } from 'react-router-dom';


const Error404=(props)=>{


    return (

        <section className="mid-content-sec in-page-content-sec">
            <div className="inbox-wrapper">
                <div className="container">
                    <div id="notfound">
                        <div className="notfound">
                            <div className="notfound-404"></div>
                                <h1>404</h1>
                                <h2>{props.h2}</h2>
                                <p>{props.p}</p>
                            <NavLink to={props.link} className="btn default-btn" >{props.backTo}</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

import styled from 'styled-components';

export const Container = styled.div`
  text-align:center;

`;
export const ContainerFluid =styled.div`
margin-top:10%;
`;
export const Span = styled.span`
  font-size:15px;
`;
export const H1 =styled.h1`

color:red;

`;
export const H2 =styled.h2`

color:red;

`;
export const H3 =styled.h3`


`;
export const H4 =styled.h4`


`;
export const H5 =styled.h5`


`;
export const H6 =styled.h6`


`;


export default Error404;
