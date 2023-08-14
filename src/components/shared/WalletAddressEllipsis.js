import PropTypes from 'prop-types'

const WalletAddressEllipsis = (props) => {
    const { text, maxTextCount } = props

    if (!text || text.length <= maxTextCount) {
        return text
    }

    const firstChars = text.substring(0, 6); // Get first 6 characters
    const lastChars = text.substring(text.length - 4); // Get last 4 characters

    return `${firstChars}...${lastChars}`;
}

WalletAddressEllipsis.propTypes = {
    text: PropTypes.string,
}

WalletAddressEllipsis.defaultProps = {
    text: '',
    maxTextCount: 0,
}

export default WalletAddressEllipsis
