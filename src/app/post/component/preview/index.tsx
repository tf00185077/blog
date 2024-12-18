import { Article } from "../../helper/type";
import Image from "next/image";
import React from "react";
const Preview = ({ article }: { article: Article; }) => {
  return article.content.map((item, index) => {
    switch (item.type) {
      case 'image':
        return (
          <Image
            width={100}
            height={100}
            key={index}
            src={item.content}
            alt={`content-${index}`}
            className="max-w-full h-auto my-2"
          />
        );
      case 'text':
        return (
          <p key={index} className="w-full whitespace-pre-wrap break-words overflow-wrap-anywhere">
            <React.Fragment key={index}>
              {item.content}
            </React.Fragment>

          </p>
        );
      default:
        return null;
    }
  });
};
export default Preview;