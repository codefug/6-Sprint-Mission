/**
 * @param {string} tag
 * @param {string} description
 * @returns {Object} element
 * 설명을 넣는 원하는 tag의 element를 만드는 함수
 */
export const createDescriptionContent = (tag, description) => {
  const newContent = document.createElement(tag);
  newContent.innerText=description;
  return newContent;
};