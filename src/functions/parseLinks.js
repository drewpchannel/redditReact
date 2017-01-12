import React from 'react';
function parseLinks (comment, id) {
	if (comment.indexOf('(htt') === -1) {
    return <p className="authorCommentBody">{comment}</p>
  }
	let currentComment = comment.split(' ');
  for (let x = 0; x < currentComment.length; x++) {
    let linkURL;
    let linkText = 'Link';
    if (currentComment[x].indexOf('(htt') !== -1) {
      if (currentComment[x].indexOf(']') !== -1) {
        let g = currentComment[x].substring(0, currentComment[x].indexOf(']')) + "] ";
        currentComment[x - 1] = currentComment[x - 1] + " " + g;
      }
      linkURL = currentComment[x].substring(currentComment[x].indexOf('(htt') + 1, currentComment[x].indexOf(')'))
      currentComment[x] = <a href={linkURL} key={id + x}>Link </a>;
    } else {
      currentComment[x] = `${currentComment[x]} `
    }
  }
  currentComment.join('');
  return (
    <p className="authorCommentBody">{currentComment}</p>
  )
}
export default parseLinks;