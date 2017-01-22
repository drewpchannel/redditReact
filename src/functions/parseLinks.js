import React from 'react';
function parseLinks (comment, id) {
	if (comment.indexOf('htt') === -1) {
    return <p className="authorCommentBody">{comment}</p>
  }
  const re = /\s\n|\s/g;
	let currentComment = comment.split(re);
  for (let x = 0; x < currentComment.length; x++) {
    let linkURL;
    let linkText = 'Link';
    if (currentComment[x].indexOf('htt') !== -1) {
      if (currentComment[x].indexOf(']') !== -1) {
        let g = currentComment[x].substring(0, currentComment[x].indexOf(']')) + "] ";
        currentComment[x - 1] = currentComment[x - 1] + " " + g;
      }
      if (currentComment[x].indexOf(')') === -1) {
        linkURL = currentComment[x].substring(currentComment[x].indexOf('htt'), currentComment[x].length)
      } else {
        linkURL = currentComment[x].substring(currentComment[x].indexOf('htt'), currentComment[x].indexOf(')'))
      }
      currentComment[x] = <a href={linkURL} target="_blank" key={id + x}>Link </a>;
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