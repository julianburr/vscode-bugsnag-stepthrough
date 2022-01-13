import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { sendMessage } from "../utils/vscode";

export function DetailsScreen() {
  const { id } = useParams();
  useEffect(() => {
    console.log({ id });
  }, [id]);

  return (
    <>
      <h1>Error #{id} Details</h1>
      <p>
        <Link to={`/?from=${id}`}>Back to overview</Link>
      </p>

      <p>
        <button>Mark as fixed</button>
        <button>Skip</button>
      </p>

      <p>x errors left</p>

      <p>
        <button
          onClick={() =>
            sendMessage("openFile", {
              data: {
                filePath: "..",
                line: 9,
                column: 4,
              },
            })
          }
        >
          Open file
        </button>
      </p>

      <p>Error details...</p>

      <p>
        <a target="_blank" href="https://www.google.com">
          Google
        </a>
      </p>
    </>
  );
}
