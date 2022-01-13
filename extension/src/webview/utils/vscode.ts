type Message = {
  command: string;
  data: any;
};

declare global {
  interface Window {
    acquireVsCodeApi: <T = unknown>() => {
      getState: () => T;
      setState: (data: T) => void;
      postMessage: (msg: Message) => void;
    };
  }
}

export const vscode = window.acquireVsCodeApi();

type SendMessageOptions = {
  data?: any;
  timeout?: number;
};

let timer: any;

// Since sending messages to vscode and receiving responses is a bit convoluted
// this helper function will deal with the overhead and return a promise that
// resolves the response data if it's received within the given timeout
export function sendMessage(
  command: string,
  { data, timeout = 10000 }: SendMessageOptions = {}
): Promise<Message> {
  return new Promise((resolve, reject) => {
    const handleMessage = (message: {
      data: { command: string; data: any };
    }) => {
      if (message.data.command === `${command}Response`) {
        clearTimeout(timer);
        window.removeEventListener("message", handleMessage);
        resolve(message.data);
      }
    };
    window.addEventListener("message", handleMessage);
    vscode.postMessage({ command, data });

    // Use timeout to throw an error if the response does not come
    // within the specified timeout
    timer = setTimeout(() => {
      window.removeEventListener("message", handleMessage);
      reject(new Error(`Command timed out after ${timeout}ms`));
    }, 10000);
  });
}
