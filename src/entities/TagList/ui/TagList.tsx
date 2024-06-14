import "./TagList.scss";
import tagXicon from "/src/shared/asset/tagXicon.png";

interface TagListProps {
  className: string;
  tags: string[];
  onDelete?: (value: string) => void;
}

// tags = {value : ~ , id: ~}
export function TagList({
  className = "styled",
  tags,
  onDelete,
}: TagListProps) {
  return (
    <div className="TagList">
      {tags &&
        tags.map((v) => (
          <div
            className={"TagList__card " + className}
            key={crypto.randomUUID()}
          >
            <span>{v}</span>
            {onDelete && (
              <button
                className="TagList__cancel"
                onClick={() => {
                  onDelete(v);
                }}
                type="button"
              >
                <img src={tagXicon} />
              </button>
            )}
          </div>
        ))}
    </div>
  );
}
