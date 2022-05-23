import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { QRCodeSVG } from 'qrcode.react'
import { toast } from 'react-toastify'
import pollService from '../services/poll'

const URL = ({ link }) => {
  const copyToClipboard = (event) => {
    navigator.clipboard.writeText(link)
    toast.success('Link copied');
  }

  return (
    <div id="poll-link" className="d-flex justify-content-between align-items-center col-12">
      <div id="link-text" className="text-nowrap">{link}</div>
      <div id="link-icon" onClick={copyToClipboard}>
        <i className="bi bi-clipboard"></i>
      </div>
    </div>
  )
}

const QR = ({ link }) => {
  return (
    <div id="qr-code-container" className="col-12 d-flex justify-content-center mt-4">
      <div className="col-8 col-sm-8 col-md-8 col-lg-12 col-xl-12 col-xxl-12 mt-4">
        <QRCodeSVG id="qr-code" value={link}/>
      </div>
    </div>
  )
}

const PollLinks = () => {
  const [poll, setPoll] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    pollService.get(id)
      .then((poll) => setPoll(poll))
      .catch((error) => console.log(error))
  }, [id])

  if (poll === null) {
    return
  }

  const link = window.location.href.replace('manage', 'vote')

  return (
    <div id="link-container" className="container mt-4 col-sm-12 col-md-10 col-lg-4 col-xl-3 col-xxl-3 d-flex flex-column align-items-center">
      <URL link={link}/>
      <QR link={link}/>
    </div>
  )
}

export default PollLinks