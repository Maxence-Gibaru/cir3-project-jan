import { Scanner } from '@yudiel/react-qr-scanner';

function scan_qr_code({ data, setData }) {
    return (
      <>
        <Scanner onScan={(result) => { setData(result)}} />
      </>
    );
  }
  
  export default scan_qr_code;
  