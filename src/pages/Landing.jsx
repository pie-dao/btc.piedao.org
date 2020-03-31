/* eslint arrow-body-style: 0 */

import React from 'react';
import { view } from 'react-easy-state';

const Landing = () => {
  return (
    <div className="content text-center flex-col font-normal">
      <span>
        Welcome to the PieDAO Frontend Template. View the&nbsp;
        <a href="https://docs.piedao.org/development-resources/frontend-template">docs</a>
        &nbsp;to find out more.
      </span>
    </div>
  );
};

export default view(Landing);
