// import { Loader } from "semantic-ui-react";
import * as React from 'react';
import './Spinner.css';

interface IProps {
  loading: boolean;
}

const Spinner: React.FunctionComponent<IProps> = props => {
  return props.loading ? (
    <div className="loading_div">
      <div className="loading"></div>
    </div>
  ) : null;
};

export default Spinner;
