import handleWindowMessage from './window';
import handleProxyMessage from './proxy';
export default function handleMessage() {
  handleWindowMessage();
  handleProxyMessage();
}
