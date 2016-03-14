import React from 'react';
// Scaffold imports
import './Comment.less';

// End scaffold imports


class Comment extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="comment">

      </div>
    );
  }
}

Comment.description = 'Displays a user comment';

Comment.propTypes = {

}

export default Comment;