import "./TagList.scss";
import tagXicon from "/src/shared/asset/tagXicon.png";

// tags = {value : ~ , id: ~}
export function TagList({ className = "styled", tags, onDelete = null }) {
  return (
    <div className="TagList">
      {tags &&
        tags.map((v) => (
          <div
            className={"TagList__card " + className}
            key={crypto.randomUUID()}
          >
            <span>{v}</span>
            {onDelete !== null && (
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
