import handleWindowMessage from './window';
import handleProxyMessage from './proxy';
export default function handleMessage() {
  console.log('============ handleMessage =============');
  console.log(handleWindowMessage);
  handleWindowMessage();
  handleProxyMessage();
}
