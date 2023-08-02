import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
// eslint-disable-next-line import/no-extraneous-dependencies
import UserSideBar from '../UserSideBar'
import AddTransactionHeader from '../AddTransactionHeader'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const jwtToken = Cookies.get('jwt_token')

class UserProfilePage extends Component {
  state = {
    city: '',
    country: '',
    dateOfBirth: '',
    id: '',
    name: '',
    permanentAddress: '',
    postalCode: '',
    presentAddress: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const url = 'https://bursting-gelding-24.hasura.app/api/rest/profile'
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': 'user',
        'x-hasura-user-id': jwtToken,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const jsonData = await response.json()

      const newData = jsonData.users

      this.setState({
        city: newData[0].city,
        country: newData[0].country,
        dateOfBirth: newData[0].date_of_birth,
        id: newData[0].id,
        name: newData[0].name,
        permanentAddress: newData[0].permanent_address,
        postalCode: newData[0].postal_code,
        presentAddress: newData[0].present_address,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Not Found</h1>
    </div>
  )

  onClickLogOut = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderTransactionView = () => {
    const {
      city,
      country,
      dateOfBirth,
      name,
      permanentAddress,
      postalCode,
      presentAddress,
    } = this.state

    return (
      <div className="profile-card-container">
        <div>
          <img
            className="profile-image-1"
            alt="profile"
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCACCAIIDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9r/E3hy3NnOEjJaMYYLnjAP58fn/L66eHg4tcutv+D/XY/nqM3FtPV39db6/eeJ+HLPyvElrGvUXUYKEf7Xft0xj0/CvnqtGEcWua+j/W3ofS4Gp+7Sfbbz9fuPsDwpp8Bu5YnGMvz+JP1446+nOK66MIqomr2udOJkpwVr6b9DF8Y6X9nfUY4lHzI56Zz3HUexPHofTn0K0E48y21fy6/keNtPXpK/yTR804b7Zg9rhRjpyPN/z/ACxXzNfT2i6/1+h79D46T6Nnr15sGlKynY3lKSQR0AzweMdO59u9edT5nOPKveUlufQ1dKDvrZdNdF/Wh84+KPG/hfwRo+ueIPFmv6ZoOj6bHNcahqur6hZ6dp9nCily9xe309vaxMVyVRpvMYAkJjBPTOVq7nNvlTs/u7HFSpyrYfkpwlKUpXVl301fQ/If4wf8Fof2YvBeoSaL4StfGnxHltbh4bnVfDenaNY+Hy0TEb7bVtb1yzmvU3YCyW2lyQyH5oriRCCeqOLUUlCOi1Tel972+fqaw4ZxmJt7WdKjDRwvdyWn2tNDy3wp/wAFZP2fvGvirxp4s1LRfGnhexvYNGc211pmn63eb4YJYmdYtD1C5SMzzSIqGeWOEbtzPkGOvRhmdOqoKUfhuneP+f8AXQ83MuDMybcqNWNT3dLaK0UvK3dd+x9yxeNPDnjPRdI8R6LKJLDWbK11CyeXCTeXcxJLGl0B+7huGR8yQbiY5FaNjuQ56K/spQ5qbSUle3/A/H8j4yOGxGHryo1Y+/Tlyy5fh081ba7v+R674OxJbRKynaw5zjk4BB+8eOR1wfpXg8lqyv1f4f1+J9HzP6rK7WiS/q/Wx6pFplo1s7sgyV+vODjH+euOtfR4alFwd9tLL+vkfH4uq41dO7X3f8OcFFY251QpjA83pgd+3T0oVKMan4Wev9f5DdeXs3fXR/d9/wDkbniTTbYWGUXB2g/XKj8v88VtXpLkut13+Zy0azdRc3V9EcX4ZXZNKo4G44A/3v8AP4V83iVH2nK921f16H2OBk/Z3T0s/XVaHqkFjBcKN4AyM9gCen4cV7mBppw8lbvf/M+ezWryzfq7Pztp+BC2i2+5uR1Pp616Psodpfezxvby7r7j7n8R30IguNzbWbOMNznpjjg5PXtWs3q7qx6z+N+v6niPh9FPi22JK/PdxDjnOXAwe2cnHHXpmvm8U19aXZy0/wDAr/kfQ4HWFl/Wx9aaZE1lqQ6hXPX2yTnnsMke+M1vTaUk3t/XkddS9nH7W9iPxaokudw6TRsjHAIyY2XkfQ+n/wBb0ZNOnb+6/wAUzyZpqbdtLP8AT/I+VdQg8nULxSP9XdD8PmOOnPc859fpXz1WFp1NLuOrXbf+tD2cPO6o21139Dx/9qv9q/4T/sr/AAqufG3xL8QRWbS2csHh7w/bES694m1RLfdHp2j2ah5JpWd0M90yfZLCEme5kiG3PjKbp1NPi1dvL+vn8z6yjhK+LjClRUlGUrTnpZJtfN+iufxZftHftbfFz9sH4g3GreK9Wu9J8GRXjx+F/AVndTvoGi2BuGeN7pHe2TVtYkR832tXluk1ww2RwW1vHFEGqnNOTls23Z6r7vyPscHlSwVKNOnFVJqy57KzaW6bX5/PqedeP/g1fad4f0rxDodj58UFo0WqfYYI2wCBPb3Fzb29wjTM0ZbyrkqzxqrQ/wB/GVbGQjL2UmoQg0oybS521d6LzezPbWXVZ0+fk5ml7/Klppta+mna9keH2Nu8czXKyy2VwiGNrmOOVDE+/wD1c6KEngO8A4xJkqzK5IZa6KdSLUnLRNKzWu/Wy1OF0alJ80W0725GuaLXVWu39/qe/fDX9oL47/CvV7K58N+PtduIAFRNK1rVbzXvD17bISVtxZalc3VutsSCoa3WCZGVo3Bj3lNYzqKKXO2rfq9/l0/HoebiMly3Gxmq2FjTm9ZTpJKbm+t+22l/M/fb9h79vDwv8a7qLwD4wtI/B/xGtlby9NM7tputiGNnuJtIaVg4dFTzJrG4kmntYnjdbi5gJkiuFTmqQ59Hsvv9X+Op8TnHD88DRnKmufD8raaWsEuknfWXZ6p/I/Xe3nDWhKsCDHkYOc5HUEeuRg9CCD0Ir63Cp+z23S/LufkOOaVZvm6ta37nBxE/2ucH/loO9Pkk6z06rt1f+TIlN+yWu+/y/I6fxBIP7OIBz8qnGOeg9vUGumrB8jurLvocVKp+8S5tX0+dv61OC8O5NxL9cjp0BNfK4uDVReUl+f8AkfdZfL3Eutnddu3k9vxPVLUlFHOOBx36fz/zkV7uXR5oeTa+6x85nMkpvvr+Q5pjk8nqfT1r0+RHgKqrLX8/8j3LUNavLiBwzjgc8nB4yP8A65rBvmv1utPuPoFL37Pa/wCRi+FJ9uu2UrE7lvInJyTxvBJ9O1fOYx2xML90vndL+tj6jLtVfpbf7up9eR6zbzzQOMg/KOvOR3P+e+K78PKnLdrTqy8TJ05ptNKTWvdGR4r1COPy5PMJyegbHbHbPXIH54zXb7nJe8du/wDXQ5KsuayUW+bayvf0t1f4H53ftoftKeEv2XfhR4j+J+rr/aGpzNFpvhjQXuI7dtZ12bdPFb55ZYLeC2nu7qXCRrDbvGZVmkhR/nM0r+yleGrqdF1X49fP0PpeGstqZnXhRs40cNJyqO3fXd267W/4B/HR4/8AGXxh/bf+Mb+JfGer32qahqtwYbBbi4b+z/D+kGVpYbDR7COOZNPtIIziONJd9xKXuJl86TI+Tx2Np4ChUxNTVpOVm7dNvk/y1P3DJsojia9LB4am1K6i5taLpd+tv66/r9+zR/wSI8KeLtPttV8Ya5rKtNGssf2RG3MDsJY+a8RKtk8hOvO08ivxnO/ErF4erKGEoxfvNXu+7X9enrf+guHvCbC4ihGtja87NJytHS76J3+R+iNn/wAEtvh34Us/L0m41XUrYxCG4g1J/N8+2AbzbdYmtp4vLlR2DFUM4MSlHCOoHzuI8QM3xcIqpSSkmrOL+5v8NP0PusP4VZLQklCs+ScfecrNPbRa2/4f7vxw/bn/AOCcmofCu6l+IHww0e++wR5k1fwrOjzyT2IyZ7iKZIwiPlmYA+aLYrGsySq8bw/bcIcd1KlaOGzNwvLSMm7Rs3olfqlv/mfnXHPhcsFTljMpU5xv70FG7Vlq9Oj/AAR+UjeCTbajbW1ql1LpWqrJc2MNwn76w1ACUT2iMdmJw8eRE21jJDyrOY2b9po1IVYQnTakqiTjytNa9vuPwavg5YapONWEoyhK0+ZNJTWjVmewfDHwzcanqyXFjdz6J418HzWOs6Nq9o/2W5jmtGW6sdYWWHcjwsFXzmZh5iRvZsky7Fi66CpTk6c/j+y+t109b/jbscuNwka+Fmp0+ek3yTW7ipL4rdu5/TB+yL8dz8ZfhrF/aifZfGXhhl0PxfYgrtXVLWGPddQAHH2TVIZItRtmUFYxcPbIxW3CJ9XlVRVKbhZ89PR33a/4FtT+a+OMiqZRmTjG/sKz5qLs/tNu1+uj9e579ESNUz0y/wDWuqXKqi1W9vxPmErU07p9H5Pr/mdTreTYn0KY/Ct6v8N/J/gcdKyxEW9FzO9/XT8DitAIW6l/L8TnNfJYz4/SR97gGrKS+Hl36bf5npsDZVeeMc/Tj+te9lf8Pbp/mfOZ2mqjb211+8GI3HBGMnHPvXpHzSTstOh6ncXkYtzyMsuCM+gJ6Dp+P9ePN9vBQ0aul5X7dz636vJz+f8AXUi8LSrJq9pjIH2iMHntu6n/AOvx/T5vGyvUc+2q36a2PpMsjKMoxfwyklJW7tX/AOGPpKaWO2KEMQOx9euM/j+GMVGFxTvq/wBP+B/me7mOFjywtFvRa26vbpb9RbK+trrxBoP23Y1mmraeLlZ9nktF56K/m7lIKbc5GBkd8CuyrXU4/u3JO2y8no3p/XkcmDpJVqMaqVlUV29lr1fS39dT+Xv/AIOZP2idE1j4/wDw0+AvgWSwksfBHhO31fVl0jyhHL4i8WotxDZSJCzqJItPtLKedZWL+Xcxn5IVIk+fxdd1sZGk78tODV1tzLp6q/8AnsfrWU4ejQwzrUacacsRKKXIleS2urbr0+/U+ef+CWP7P2t+I7yz8Sapp/2lnkDZkjaRERQrqpDRvJKDv+YxqinO12OAD+R+IOfUaFL6jSmvazTTtJNr5JrT9fw/fPDLhutXxEcdWg3Tg07yVl976+Xa/Y/ry+D3w+GmWdgjwoknkxo6KhUJgDK7PLjAxk8Z7c+/43gcDHF1eas3LVu/fXdb3v3+4/oTF5j9SoexowtGy9FZabX9T6utvAtrLCA0KszIuNwLYIwcqCcA9umMdc9/r8PkOHkrpLpvpb/h+x8tW4pxEJcrlazWn9dde9r9GeUfE/4M6N4g0meG9s7aQvHKrGeCOUMGXYwKuChEiMyOr5jZeCAC2dnw7h5NKNSNGolJxm7pprVK+is/6Z0UOKaklarS+sUpOMZQcebSTtfZp9tEfyFft6fs1aH8Fvi9H/Y9jaw6T4mu5tUtLWOFI47TULd4TepaupSSJ7iYWE9s0LQskx8yQERMG/QvD7Oqlf63lNeop1sDOE4TWvNBtxsr725X96PybxP4dp4OeFzbDUlToZi7SglZQqc3Nd9Emml5W+R8YabpNxoPjvw9q2lQxyaNqct/pt5cLthVP7SNrfaVeWzNBJKsNvqlxLaXMCskYhvriKe3kLKw/T8RpUpVqTUUp81S2nW7T7N+du/Y/KMPSqp1KcoqSnFwUXs4/wA0W97baH33+yV4ntPCfxsIVZNP0rxt4bl03ULKRyVtvEelPaz2QeNVRElW2a+soHjSNbhbNwFZsM3t5bj4/Wo2TUakZJ9rq2v4/r6fmXiTkjxOSLEQp/vcHXi1JxtPkafM3pdQ0Wvnp2P1STVoFv1fcCu/qOR8uARkcZHfvntXuTqR9pHTrt63sfgKoTlRUmlFa2/vO+9ut+60+SOk1PW7V7HCsCdgHX37/lXTOpF07XS+enbucVPDP2l7S9dbdNtP68jm/D0wmuJCvTPH6/XNfNYpXqPtzP8AB3/E+ywKtTUbq1lvp/W56G17Hag7j2H8h9fp0PTivSy6ryJK66aXPFzihUm3y3evTb7zOOswkk5Xkn+L/wCxr1fbrsvvPC+rVf5fwf8Ame2y2OcjII579B2/TtXxMsTOT3suuv4n6T9TgtVv5E2hJHp1/b3Eo3RRXCPIAM7lU5K4OOoyCOB0Hcms7Kck5TbipK+vTr66GsKbp233Wq3Vu3meh6j4+gLyi20W7aPP7sPNGvHZgCWK564zgVnOlTcv3crK/wCv3f19/pwxi5fZzoynZaOXkls/l+B5f44+L2n+FPD+sa/4hspLDSdH0671C+m89JHW3tomlcRqoIeV9uyKInMspREBcqptzo4ajOcqrct7X37KxhSjUx2JpYWhh5RlUqq7WiS3bvv+eh/E0tn4n/b0/bRtry4uDNeeP/Emr+JNVuVmkmGj+Ebe8nuI7GEM84g+x6ZaQ6Tb4U+XAsKKdzM5+NzfMJZVlGNx1R3rTjzUZX6zdrq9u6vb8dD+geGsojjcxy7KaUb06SSrT6rkSk+mnqf19/s8fCjxX8KtFsPDHwn8D+CrW10+ztVS68W69PpL6r5I2ySQ2ek6VqFy8hxlLi8liXfJuaAjL1+ALDQzTFPFY/GVHObbUY2m1zO9tb2t010P6iwleplOCjhsBhY8sUrytrNpWb0tu1c+9Phx8cZdN1yPw18UvAd58PdbIBh1GC7j1nwvqCgxIr2+pRxWk9u0hYssc1sVZVP70OpSvdoZfgMAlKOI5rW0mkpX81smjz6mOx+Oc4ypTTbl7qv89N38l+B946JrFldW0csMkcqNHGY3BBVkcbwwPPBU5HtXs4fE0KkJqHK3pqrJX0X+R4mIw2JpybnDS/X8vx2MrxG9tcxPHuQkqeMqT3HTv1/+vW8/ZytT05+W+luq/rT8DbCzqwkp8rjFNaWaV7q7+8/mT/4LHfD+Q6TonjOzjlafRL8XqGMMvyQzxG7RHVTtLQogYEEYfkHAFeBw1XqZVxUtXGGKbg7pq6V7u733/Rn0PHFGGb8JRlZOWESa6/8ABPxG8M+JdMRpvtX2e4tWlW4ggeSMG2M08N9ZyQ7svAJbuGIysh2OgtIJYyTCp/cnjfa81OnK6b9/Xquv3bP1R+AUsNOl7OrJXpx5Vt8N35+X9dDu7T4m6JB4o0/xTplx/Z9zbaxpN5dHKhftttcLbX8JVcskix3kd3vQn/SIZtpVY8VdDMkm6cZclWm1yu/fe3lZI8/PMop4vDV1J+0o4qlKLjvZpOy/F+R+2Hhtz4h0y01S3lEouIo5S6cBvMRSXwem4nPqVKk4NfUUsd7SMJKV5JJTu7a237Wv/wAA/l/M8nlgsTVoyilSpycIWVtLtr07HSvpd20ZUlsY/ut29/611yxTbu30tueX9SSjokreX+Rp6DD9jlw+Qc5zyOp/D/P1rnqSdRafL+vvOijT9mnfv+F/z/rzOl1ANccRuecDrz2PXp3qaVaVO/l66M0rUITS81p+HzKH9nv/AHx+a1r9al3f/kxzfU4eX3f8A+r3sm2tkdueRn+X+RXmuEkrtaI9tTTdtTJe3ZGyAcDseuTnnt/+uoLIJY2YfeZRjOEKgkj3KsRnOOMdqPw8+wnom/8AgnxL+2nDHrXgLTfhzJe39mnxO8V+GPA+pHTrlbbVZfDmsanAvie20u7bcba8vtEi1eOCcRyGHyXYAl+PkuKszllOUYjFw/eVadOdX09m/Xsfpnhhw++IuKMDhJq9OrVhR0/d61U9r+n+R+f3/BM79hTVvg9+0f8AEbxJr8ck2n6Vpf8AZPhue6iUSSadreqz/YJDDG0pgMmm6d9okt0kmdY5BG80zZ2fmvF3FFLNclwlLB1U4zUYytT1Tirv8f62P6Y4M4OxGUZ9ja2KpOMqXPSi4VPaabJ21376fifp18cv2OfjX47+I8Xiuz+NfxM8IeArLR9ThtfDvgq/0/wsBqx0qWLRb251G+0XW5pLG21J4Z721KWrT20ckMF1bSMu/wAjhbPcly9UY5nl1GrF83tsTVp+0nF/ZcY9O6S20PruKMhzjMYyWU5tXwNenyuhQi0oSenNz+z11vr1v5mp+xb4C/bV0DRofDP7R3jHS/iB4fudcu7LS7fWNU8P+I/F3hWxs9CF1H4kvvFfh7RvCOlT6RqOq2lxYWukx+Hp/ElimoWt1f65NZW1zayfTcQVOGc5wCxGWTVGpTk3U09m5SV/s/Zeu1u/Q8vhyhxTlWKqUc9dPE0akP3GJp3dZVtPdTk+Zxf97u7ts/Y/wneGz8IC5Moje3twp3MxyygqgG4A/wAJIznGOSeSfhcBUSwGMlCfLKnKUYP+d6r53sfV4qE54/D050lKNRRclb4dFdvXd7vzb2PhT4+/tFN4EW6bxF8c/CfwRtA6ywa14vGlJAtm88dtFcG31WSOOSO4m2wxM5xJK2xF3Ag+jkeHzrF1U6WCq4iMPeurtWfW/wDXr1Ms7q5LgKNq+OoYR1bxjz1FGXMt1Z/gfBv7Xd94i+L/AOzn4k1DRv2hvhP8etNttMk1a3t/D+i6Vo2rvbXaEbLTU9LupbSZblX329wLdUeS3MJnwJzJ9DjqNGGKwUsfRq4bEwqJ4eVrRTulJVP7isvvfQ8WjDE1MrzBYPE0cbgnSm66UlN8rjp7P+/r+R/LJYXep/2Q9+VfLRXNle2kyMsjtCXW6aAM5cSW8mIXt0mt5kihguoQtxbQzn7GrWcJqrGUXzU48jp35GkrNr5/j+H5ZhqU5RlTanGnzzup/GldpX6enSx53/wm02jahNY3l4wj1IzC1mB8z/SoZIrpVZWJAKYuJCAVLufLwD5TLFGftGqr+KLbf4fk/wCkY4mMqfNT+xa0PmvyP6YP2N/Hv/Cc/Bvwf4kjkSZ5dOFpqogbcIp7GeaGRwu8lJVeKd8FXk2FFfKBAn1+WT56N1/X9ep+CcZYP2OPnpvaTvvqmn/X/Dn2x5IdAytlXUFTyVORkEE4Jz2zyRya9lbL0X5Hwb0uvO5z8ytFMcccgZH1/Tp/9euqHwr0OT/M27QGUAnOcDvwQOPbj+tc8vil6v8AM1p7P/E/yRr+V/s/r/8AXpGh9LSX8h3DywARwSpycj/P4V2TozfMrbt+XU5Fjaad/mZU9z5aEsAOvP1/KsHhJ2bsWswp9/wMr+0Izu+ZeT07nnkdc/Ssvq9X+U1+vUO7+4/LD/gpP461/wCH+k/Df4g6Fbi5m8FeN/DHjCKJ932W5l8Pal9qOnXOwFjBfJLNa3CqN7W8kyLgycfn/FeCjipPBVoyWHxNCtTm27Je1Xs1b59UfuvhLmCws5ZjQlGWJwtahUp7N2pYmhN+vuu2+10fpZ8AbO1t/EWt6vFa3MB1K80a8hW8YSsbSSwcWjRyoBHJCUZygQLs3NvRZGcD+f8AEVacKFOnTg6ahX5Ff+63HT7v+H0P7ayegqmJq1JzjKVahCv7u7bSk9VrfXufq/4a0q2u9PildUO9FYq6qwJIx91wV+6SOmea+lwWX0KtKNVcsm4xk4tXs2k+unf8UeHm+PdLGShGMo7pOOjae2q126+uxznxM1DSvC+hR2dpZ2lvNqTPGI7WCFJJTgDMnlqpKlsKzMQC3y8kceLn+IlhqCo07e9O1oWT7a2S/G/+fbw/hvrmI9vUc+aFn+8bkuXe/vN7eSv+ByEY+zaJoenzB1a+LS3O/IU7jhUUkYz95QAflPUA1y0ZVKGEwtNwlS9rUVVyle01dq2u99vXvufTPCUquJx9WE6dV0qXs4xulKEnBPW3nfX56I8P/aC/Yy8L/HLQPEti1neeV43j0H/hKZdE8Rat4P8AE0lz4amiudBvdO8SaPcWzpPpbBooIbtLmIQSNbkPbtJC/wCg4PNs6ypUqmU1Uqc0vb0ZRi+aNls3d69Euh+X43JcgzepVocQUHOdOX7irTnLmi79bOzt5n5AePP+CP2n/C+yvtR+EOva94ItNP8AD9tYXHhr+2m1m08QwQX899q19rzSRxSX2uzpI00eo27200otoYLiK6WCzW3nNuLMZVpSWY5bTas/Yz91TjOy97vbr0PWybgvLMO3/Y2LxylKDjVpynejOCWloNtXs7bdj+dTxtdaH8Pvjf44+EXiqHbpes3f9paZPFgvY61CJLG9lsi7ZZmki3y2isjXkFxM9vItzaW4k97KJVMZk2GxbvUlTcuZLaMG07WPzbNfYZdneKyyuvZ067vGXWM1olfdeVn8jwT4q/Da60/bPpjWusWG+S+0fUYYg0dw8bGeG3d41g2zRMpU70tzIrJCbe22olbRxX1WvFL3adRqTbvrfpbyPMxuCdSinGXPGDfLbe0FfV763W/Y/Zz/AIJX+J3g+FfiXRJHfy9O8UXOoWUdyGfy49X0fS77ERyMM8329Gt5jLEksU5SLc8hf7LI6kqntIRalHn5lbTfT7tv0PxLxBw6jLDVZJpVaMkn3cW7/qj9hrS/VYEVFLRqiBOOdqoAuffaeffNfYLC1NGrapL8l+h+LVcdRi3G/wAD5X/XyM26uV3kmPGenB657c4wPT1roWHq8vvRv5HM8TSkuZSuzStLt1UFEGOAeD6f5HPpUvDTf2Lef9biWPhHTa/drcvfb5P7v6Uvqk+z+5/5F/XofzI+jjfQbEzkkKM/McdOO+OK7VPW7t9yv99v+Cee4Sa2/IyNSvI3iwoyTx19c+5OP89K6adp76Kzv8v+HOSqnFpXa3vZu35nNZhCbnLg5JHylvXjPOB7A/zrT2VPuv8AyUycpa+8/vbPzs/4Ka22n3H7NWpX083l3Fpq9rbWSFPMe6luku18sDnAht0ubsLyHkghiAPm7D+ecb4dQwtGtBqUo1rRX8yUk7aPVX19dfM/Z/B7HTjmuLwkryp1cPza6qDte6T66J302PXP+CWP7S8X7SnwU07zLHUIPHvwgTRPhz8Qr27AMev6lY219PouvWs4u5BN9u0MQJeBrSwkhvbaeFo7pka/u/5o41wssthR5I0406lV1aDpScnKUtZRle91BttJ6Jra5/ePh5mccdKrKdSpKrRo0KFaNWKSUYR5ZKHRN6X76N6n7peG/F1zBaW1oSUlkj+TcwQAIFBYlht+8y5Ayfm+X28TLs9xXJClByj7rTeydtLvpq3dan1+MynC1aksQ9Urv3tdFsr+S+88P+J+n/FHxDrWlXfhzxNdWcVndpd6poh0exvo9Yht2YxaWbm80+4vLC2MnlzJeaRe2dyl1Ghuft9pJPayzWq162IftYTqzlFcm8oqV73V7/eOhClSpc1KfsKkHskuWrR6Xtom139TDn8V/tQah408FWN38GLTUfA8onstU1Cbxvotjq+nzzbUtNStdIt7a6ge0JDyXKXuq6ZMNxkS2aWNY5fTrLH144SM1Nzg4woRkrU4Rk7Sv/htzdbXubYaeBofWZQVHDwnF1sVWlUc61ZxV1yp3tzXUbLolc+xPCOvalpn2jQfEZhXVdOVcmGUSRXFpKxaCVSyhidiKkmVysgKkAYFfRZZmU8FWqYHGODqUWnQmnzKdN6uzerS/A+YzPLaOOjTx2Xc6oYlP2lOV17OrHRtRuuVSlfQ4H4sa9p0VnPO0kQVIZDucjJ3L8w5HIPAYdCAAc9BHEeaYTERUaXI3yuOlm9Pld63+8+o4QynE03eteLTS1vp109Va/62R/nLf8FUr5Yv21vidaeFX+zxaNqb3FuIcMkUklpLq5QLyuIPtxgUbcosrCMDHP6ZwJBR4do+01VVuCjLZp3d7d1sux/OPitK3GGKhQ+OglJ9ua99Uuv49TyzwfrepeNPAkWs2lzc6X4y0qcW91bW8rCw8Qw2ttE0iyRTF7eK+VXjaIvF5tyEnjgvY44ksot8wwtKlXlRlHni4uUJNJ8mq+F9LX6W/wAvMyzGTxOEUlNwrxai6afLCSae6vZ3tZ/1f9df+CbesXqavc6dcw79L8VFbaKMxfZ57XU7Nbq9Eg2M8ISVXaxeVj5nnIGSRYppRXs8G8tPHOhJtxnZJye70dlrbfU/OfFnDVZcPU8ZFJYjC+9KNPRKDk46WV7PqfvzpHhqJbNI5NzSD5lbHWJvuFv4srzGdxPyqpJySK/baGChyxjpdq+19Pn87H8d4zHVfaylFv3ruVm7cy6a6X/H77lfVfD8UToB3IUjA9M+3GK0q4RR1Vvu/r8bmdDG1paNtJ3e9/Tb87mzpfh23eDLdsZyB1/Pof506WFjKMtFe3ZP8bfoFXFTU929b6t7/wBdbf5lo+H7fJ69T3P+NafUl5fcv/kTL61P+b8/8zr1ZmUcknaPlzjt/hyK+PcFa6Wvfqj7V1NdFbz/AOCRODIvA6H16fj/AJ/Gu2lGUYcy1VrvzWl1/mclV80kurfXze3z/QpzRhVO7PTGB06/1/I1h7V320vYuVNcuiV+nfyPz2/4KX6RJqH7M97q8MU0qeGfElhrVxFCHYGCOw1W1BmRBzCJLyORt33WUMuGAI+O4vqL6rhalvdhi6cWr6WcldNeet7n6l4VNU84xiUvenl0uTuqiqUo8y87Sa+b07+Sf8E8fGXw6+BP7YHxz+EXhy8js/Cfx28LeEfHvgmOeSGO2Txp4R0KXV9b8OaeFZBJPfaB4p1jV7aNRIy2fhZoix/dhvxPj3Byx+EqPDQc3l9qsOWN7qvaMkrJ35bv+nY/rLwrzSeFxVCOPfs6mPdWEuduynBy5ZO/86Vt1e5+/D3t58S/Dx8OaV4j1XwVrEBDab4r0VLGaZSozHG9vqNvd6fMjOqebBc28sbLkbc7SPx7LWp1I0qkFF0Hu9OZRvp03+X6n9CYuUoxvzpUakeZpNaarmt5Wb26HkUGkfGHwrrTw+If2kfE2mzQbPLu9d8MWj6VK8c6Os0f9hXuiWVujorBo7iymhAO4q64WvvsBicrbhZ0cPUsuZVl1e/I29F2PoMDSybE4ZRhh1Vk4xjKMYrnmrbNylZ630TWp003xK/aB0KZb/w38Qvhd8WreRtp0ma21LQru7JI+SK60mz1JLJ/4FZ5biAtIHltX2jd7FeOEnTbpYqgnq9JKTTlo7RvdaJ7G0sgyWvGUZ4aWWtU2lUlOMVJR95JptrV67/a7WR7X4b1Dxz8Q4dM8R+KvC2sfC7WNOY+dZ6hrGk6mt9ZSpIJoUm024uVu7OSRYZ7Z7hbS8iZYme3ty0qJ8RmdKr7aE1iFelFxhXj7r5ZL4Vo/TW58/h50MM6+FjCGIj7S0eX3oNp6S0633s11sjzT4sWzHTdTu7zW3XSdNt5bi6meTZEqxqZHDOW2ZULyDk4IBHSvEjTnUqRpxqNyclCEpXbc52slb9Op9HRzGGHoSlKnySceecoaezjBczl81Fpva0T/Oy/bn+Jvh7xt+0R8SfF/hfU7bWoNa8d6zdi8094p0j06z1MaLY2stzFLIHe407So7iSIGMQC6kDo2Y52/qLhbATw+U4OnWpzpSp0YrlmrKUpK7lFPWz39WfxRxvmcMx4kzPGQqxqQxGLn71N3cYQlyKMmtOn42ep2On+Hr/AELw74c1nRYJptJ8Raba+XJCSJ7OcKLnT9RgmWQ7pLeZhBewMVt3tLpSUVUlAyxjhCvUjVbc0moKXwtPe/3K3noRg6VSFCnXw65oysmlupW0e27/AMz9MP2GPEKW3jPwfbRypBdrqNhq5hJeFJJHh1aK4ssOdgu57i5sUWNlWITGGCKFYgqxmVV54bFYScXeLxcNftXvqvNW6f8AAODjDC08ZkWZQqpq2X1JVLpv2bprnjKK3vzaO9z+ijR/GNtcQ2zxtGpEZVkVsMm35HVo2JYfOjbTlgNv3mzk/vGAx8alKnUaTlyyjy/9vPXfyR/EWcZTUw+Ir6LklJyUY35UpSny29VFX9O+ztT8QJKyHI6k8EZOPccevFdVfFNq/KktPz/4Y8rC4Z3t11+Xf+v+HNDTvEccUBGRggH1PGenHPp7/hRSxKS0W/X+v6RpUwz5tXZrfr/WmvqPPiYZPz/y/wAar61Lv/X3GX1Zf1/w56akYVMnALIPfPyjp6fhzmvlz7F63KnmCJGAwTuHPPA47dOMfWu6n/Ak+qWnz/rqedOT9pvtK/3PQqXWXTIOCAenGDwQeeO/TNeetZa66v8AA7VJuKv+S7I8h+NPgS2+Ifwj8d+E722N9Fqvh7UofJVQ8jv9mkwYF2Pmddu6EKpLSKowc5Hh8R4D61ltanBXnG1aHlNappeT6PTyPq+B83hlHEGCrVm/YYmX1ed+ilJSvfonKMXZvSx/Ij8ddY+I/h3X/By+EdR1bQfid4C8RXOraBrultcW+qQaj4U0mS80yS0kiPml1s9DtrRIGDW8/wBqkhuBLb3To/5jlkoYjFTw9eKlCFKrCvTkr813y631289L6a6n9S4ycsHhKOLw9RrmlTqUJwduX3r3TXnu3v1R/WB/wTP/AGwZv2kf2c/BXxR8Uw6ZpXjOe61bw74203TFkh0oeJvDWoyWGoXOnW88kstnBqVoLDW4tOkmkkto9S8iKSaOItX5JxZkOEyXOK0MPNqDarwp3u/Zz15Lu9+Vu1+ttbH7jwpxBXzzK8HVrRblGLoSndpKUJPnlJLT34rr8j9tfDx+HnjTS7V9STSb51hB23SRTbdwAYfvA20Ek5GeScnI5p5ZHK8VT5cSqanZW57Jp6aJ9NfT5M9PF1s1oVGsLzuHM3Hlu4tdLLXpbZehX1aw+H/hMGXSrfS7MqMkrHbhV+9kKQqgDA7+gzmljf7OwCaoSi59Gvebvr59/U9XATzjGRjHEuq6a3ja0V6LRbW066nx18aP2j/AfgmG5vdc8V2OnQWKMZZLu/ihiQKVCwhGlxyA21FGcdsGvnKyxOYzgqdOrJKyTpx3e2qtbT0+Z9HTrYTLaXPUlQp62/eNRXm9LXb8z+Yv/gpt/wAFlbHWvCWs/A/9n3U2v9Z8Q2l1pOreItPaQRaRY3uIbu5juYpSGvWtnljtUTcySMs0zQrCon/UuCeBJyrQzTNkqdDDyjUo0ppfvZxV4tprvv09T8b8QvEqlRpV8pyOcqmJxEVTrVqb/hQk5QfLbpa+vm9rH82Y8MLZW9hp0sIa6NvFLdBwZWS6uEW5fzHYLl0jYRk7hi7juHG2Nkdv1eti3KrKp8EL2jBfCktFyrZadNj8WjgoqjCCXPPk5pTerk5atyl11e7u9kfpZ8BrddT+DkGm37i/Xwtq0c+mPJKkrzaeVSa70hgZFOGmcHyRIolDJ5i/uIpB89mM1ias46QlKPuyvb3ltY+ryeLpYdRl7yg4vlSWiWl9NfvuvLQ+nPhWmneFvin4L8TaM7LonjS4tI0hhnk+0Wdzpms2puoYt6hftlhFp3nQ/ulJtJ7C5jQxXCGTny73K2GU2/aUa0L9FKz0dtvmtTl4loKpgswnBp+3wGIjCnpao5U2uT1VrrrfU/eXw7DJqEds8U0dxMMTNPFJ5KKJIQY5WQqZITLPFKHTLjzA7fIN0Y/asDBynZS2hFxS05U7trS27fa/Q/i7N5U40ZOrem+Z05KWr51VqSUbu7aUZK2r+bO6urRowu5i7EBi2Au7cM7sZIBOckdule3KF42b1031ufH0KtpyaV1rZ7f19xp6fYmWMY9Oeeh/P0/nz3qqMLrdaa76b/1cjEVmpaLf8i4dKOTx3/vf/Xrb2Xmc3t59l93/AAT2L7S2IwOfkX1/u8c/59DXzcXd69LbH10m9UreX3eo5VMqsQOh+vpz29RxXbzKNKUV1Wtzh5W6iv8AzK/3knkkjDc5HPHXj8MdOnbrXBs36ndypRVvL8rEtvB8r8sAvOBjC84BHp169uKVayhJ91ytPazHRUnVilZWa5Gt077rXR9Gz+V3/goXoV78N/j9onxYbQJrb4eeJfEfiu20W6tohJBJf6bpN5olywQfu4lt9UY3EaFQHgZmjBZF2/kdPCToZrjMVKPLTxMm6L+zJX95et/03SP6ty3GU8XkGCyr20a2OwlGlHEq+sXU9+nK29lC9+71Ppb/AIIR6lPe+CP2ifhjeTM82ieNPCPjbTVBbZC/jbw7qFjPLAyvtUCTwRC7lDhnmaMsz8L8J4n4ZKWU5jyrm5Z0ZaJcyvzNStvJN730Vkfrnhfik6OaZe5P93UVWDbvyuUVB27e6ltpe78j9kvHOp/FnwfayXPg/Xblb+MMFtZndrZlGSpDAhkT7oYBiV4r8phVTm+b3Vr8Pu/ifrkZ1Y315pQ+G+q02/r/AIc+GfHnx/8A20dae50bTZ7C1c74jeW63k0sY+ZNys04RWG5SGLgY4JyCK9CnHAR5auIqOWzUee7f9fgRPMs05XSp8q5k17sLW7ddXbfU+T/AIjfsifF3XvBXiD4y/tM+O9ftvBeh2UmpR+HDez2t14iupzi1t1gWZPsttdXDQxebMlxe3W7ZFbxws15H7OCzqnCtCjg6CpSnJRUrK9l19Lf128rE5HicRh6+NzHGSnSpwlUVHmatJL3dOvnfc/m3+IUCJ421y/kt7a1LXDTRWMMUVvbWcsm1tMsoIEWOIRWlu9tIYwu3DJE4wcL/QeV1OfA0actZOknJPZu267bff6afzhmlNPMK9TSHvaWVnZSaWrtpY+gdB+HM/ijS7XXbAxytF4dbUPL8z97cy6Pdwx6uVkdiHlg066s5QFZt6Ls+V5ga8HFVnSxM6SbcfaXavey1W/Sx9NhcNGphqdV8vvU7cyVve6W6ntPws0nXfA+vS20GmSapo2vaatzqehNK+++jtzOpvNOkUgWWrweTeQW04jCSLF5EyvbMEXjx83VoxdmpwmnBx92+1r91329dj08Bh5YeVXl9+EqTdRO0mo215drNr8u2/rFp4j0vwJfeCFuL+W+0nTfENt4g03VVRJM6TqC2wWa+hK7d8lobeC6jx+7nXEoJjIHThVOdSlVdlKLpzlZWW6W3Xv6nl5tGLwlTDqTk6lKpKhrecXyvTm63P6OPhXqtrqEB1nTbqG50zULGxu7Xa4eBxeG4vCInVnZcwzw7N7vnHlZ2RQpF+vZLVdWVWrHSnaKjKT0ulZr8D+OuLsK4unhp0vZ1oVKjlzK3Na0Yt6avlju923bqez3M1vJHuUMoJLhSPuh8MBnJA68Dt0+n0E5prfXy/r9T4aGGdKa5kr9OV6fNGrpl3bRR4fHbrj07+nH0q6HVX02/C/5mGLglOP3v5ml/aFp7fpWt33Zx8seyPUIYFaGJsDJjUe/avnFpfs9z6+aSu0/v/pFmKPy+MZ3EKAOckkAfr279K2lJqF3ZRte7dvPX+v8jGNLmmuVOc21aME3q3portvy6lw6dqBOBYXgwM4+yzj5f7x/d8Dn73Sub2lPrOG+vvx0/M7HhsVy6YbEPt+4ne62+82LTwl4jNv9pfw9rP2KZcpdSaZex2ssZO1mW5eFICOoJMgXkEMMipq1qDTj7WPfdbL59eh0YTJs2rzjOlgcTeT1U6cqa8t7ep83/tC/8Eu/id+0z8Lbr4UW0+m6T4P12Y6x4c8Xa1NbSX3w+vRfLqjfaYIZor/xLpV2z3EcUSmG/Tz4obi/njeGeD5fHQo1UqUF+7pTVSnPZws78q6Wv+B+ucP5ZnGAxax1fkjVqRdCvCE7pwXwT1bfOl7q2Vr/AC8h/Yz/AGQfg7+xZ4q8UfD34W3Wq+LJ9O8RWHhH4ifE/wAReW2q/EHxD4YtLjTtSax02JpLPw54U0DWr7U9I0fw/ayXc0N7Bqd1qOqanPNG9t+BeIGd08bi3gqfvU8FUilazvObtVcv8Nlbf1R/VnAOTVMFhfrVW8KuYx9pb7MYJ3gl6p6tn6CeIPBWmahqkiW5uIBKdyxCDzoVZxncpJzEpB3FWYqDwBxX5fZ3u7767afgfqsKc20lyy2u+/8Anc6zwl8H/AvhkHVrmwj1rWJAJElvolFvayNgLJHbDfmRWKHzpMlThoguMm4ypxblNe0vtzt2i/K2v3ouUKk6kYWjTUesN5bbt3XpZHwD/wAFIdBm8YeCLfw/AqrpsE/2me2ghMcckqrsjaeOMKJikZmNvEUO1yWyWc50wuMdPFc6utFyv+W2mn4GuZUlVwLpJ35tJN7uy67H8RX7YXhCDwb8Q20q0ZG+0RrLetbvuS3nnmMJiVg8imVRLbNKEJ2uJkkCuhWv6O4Lxc8VgY1ak3OUVaN9rWWnlbVH8zcZ4WGGx0lFbuzS6JPdefft6Hu/gif+x/hf4P1G1kaC3N5qMwkAb93Bdta6TeB92WNszRafNKTkbY2YcqmOjEU4/XK7a+K3y66dv6+V4ebWVYZwbUYSTbW7t0fltt92p9e6PrOlaVB4U8QW0Ni1xPGbG3aeFWFtqcFuk0FpexTKIWAvNXu2mg3BjHGyB95212SpUq+HbatKCSils2r9/PtbVnXSx1ShUoVdZRqc8ZRduXXlsn1t8zjvgn4Y0T4m+MvBUT3sEWkDxl4pkTTDK0bS6TJo+oeLLHRXuIzE8Ml9fXV9ZCViB5ktuWCwsgj8xTdCpOTSt7Nq3RNbetztjhqeK5ai5XJVU7K14qW8V2iut/8AgP8Arb/4Jk/A7w7Z678eP2cdQ0nR/iV8HfAC+APEXw+8Raxp1uuuaBH8TPAmh+NtU8JWuvqkGsnT9KvdavG0tGvs2UEnkK0cavHF9RkGOxHNOlGpL2cYRnZ/zSXvJ/4WtPxZ8Nxfw3lWIpRxOIwVL2znKkm0lJxW0/n8l1Po/wCO/wCw14l8JQv4j+EKal4p8PKJHvPCTu154j0aHLMP7NLN52u2qrtRYkD6oAYysd6hknH32Gx8LKFRq7vr2dr/ANb9kfz5xFwROhNYrLYOrFXcqad5JPR8tu1r63Pzo1STUdKuJrK8ins7q3le3uLW6SW3uLeZDh4bi3mWOWGVCMPFIiOhGGVTkV7eGanFyi01v+FvP+rH5Xj6U4VXTnCUJwupRknGSa9d/kkZn9rTf89V/wC+h/jWp5tn2Psi0VjbwH+Hy1+p+gGcnt7+wOa+dina7310v+p9XJfzddLddXa217t2t8j7Y/Zu+FEoa48c+I9LIQJFH4ZhvYUzJJI2+fVooX3OoRBFBZzSKqMJZZ4dxWKQePmuL0jTpyW6U10s9Gr383/Vj9M4G4cmnWzHG0XBL/d6dRWqKS1hU5WvhWjT+R9lx281zKGkRUgt0boSPMLH5Ubg4TPOCQODg5rxnLTZfj/mfpEYPmtdaf3I9H6b+ZpR2gf5TGCHC5ODgKCCEOe3pxxg1mtO77e81+R080ly2fwrqk/0Rz/xC8T6d4F8G+JPFGrTfZ9N8O6Le6ldeWQHZYIf3Nvbqfv313MIbOyiX5pJ5UhiBmljB5s2xNPA5fWr1J8sYUpzlJu2sU3Fa9ztynA1cxzTD4WjCMva1KS0TfNZ+83rZde+3zPwy8HTyW+l6vrmrbLfW9W1mPWmt4WaaMazqviObxJrPl3AGJANSvblFeY5kidcqjOQf5NxGOWLxWMrylZV8ROr0fKpScUvPT3r6b/Nf1thct9hQwlKEGlhsP7LRWs0knb05bWufq0fAmj2+kWGoo1oqy2cM0rTgCRn8hZGd5QQCoLE7WKquSQAev0dfLcNTwUMT7ai48kW+dqL21t933nl0MZinjZYaNOtL33GLjFtW5rK/bpr3PLNbm03ZLBYPJeSFdoXT4nKk4IYGYhFYfKQgHmgcHoNo+UrYjB80lScpvso3Xytv/w59fhcDjJ+9WUaSWt5Oz+5tfmfnh+0v4W1zxLYZltRZaVcRvFI8qsGfdd2kE287QCYkaGV/LLFdgKY/fbMabnOUbU+SGrTfrZ9rG1enTjT5ebnu1ddvz6n8VX7fXhKaD4/+K9Fb5XsERLICNkQ3QuLy6jtgkiIqpe6ZbFodp5nFumRJIAf6I4Kn7DKKU780m7OP920fe/F+V1ufzdxzQ9pmteMU4w5LqW/vqUrxtpolyov+H7q2i+CHhmxgR2v5dOtbryI02eZcXeu6i8doxxgNcC6079y2cBZWK4iG36Os4yxNSUPevG/4P8AL5eh5WFqqGWUacldxbXL3bfXfZduxznj/wAa6poeqNpFrPOmmxwaTrlwmWKxXVlDdLqLorZA861MKdMk+S/YF5oyclFf3vejfRLf+v6tjiZShOMIuyShO1k7S/lWvXTV/NHqf7JWqJ4b+JngO01O4IitfE8GtatGCW+z2j2lvp7wywsyoWi0qGTUTGxAZXhidldtjYYyl7WnOpHSKnyNrW6SvzX21em1j2Mqq8tRp/HJqacm7c0rKMLeZ/dZ/wAEb9Afw/8As93WqapDer4u8QeKNV1nxBcXigXep+Grkf2b8O7+ItHG88Vr4X0yHQ4omWM40ibyVm/ctcelw0/3Vbm92sqkouPVRT91363XkvmefxnGq6mHlLldNw91x+3NfxE10cHZLyd3qftdbrbSxZDpKGVRIMjzFYqABIpwUGOsbDcxIOzALV9bGV43tZ3PzmULczUbWejvdX6Oz3V+h8K/tjfsc23x20uLxN4PubbRPiRoVnNFbXE8IWz8TWSKHg0jWJ4gJIJoGDLpmoFJRbCU200cls6Na+vg8bOjyptOL3u/Lrro/wA+2x8TxTwtQzyEa1KMaWOppuM4LljiJW0jO2ivtom7n4S6l8DPjppeo3+mXXwz8cm6069urC5Nt4Y1q+tjPZzyW8xt72ysriyvIDJG3lXVpcT2txHtlt5pYnR29hYqm0n7R6o/HqmQ4+nUnTlgMU3TnKDapSavFuLs76q60fY/YP4JfAT+1E0rxN4ttcaV5aXGn6NMjrJe7nTyri+RgNlqR+8jtThrlQWlX7OWEvyuKx7hBxg/ed0npo+/n95+kcPcJ+2q08bj6a5FJSjSknstVe9la9vwPvJoEtrNEjUIhYEKAABz8oAAAAUYwAMccY6V4U5tz55Lmk07vz9D9Up07JJWSglGPKrPlX2X0aZeto90H3eZWUEdOAM+h7/l/Jq76Bom+v6/10NEReWCWAyMbccc8Yb6dseozVRjzX1tawpNKDl5bdT5P/a/8w/Dzw1oTXUSf8Jh4p+0XFkwYyXWheF7O61B7h8rtSK38Rv4b+b5/mljbjjP514o4qWHyKFGFTlnjcTCkraNqK5pq19dE0/6R+oeEOXRxeeVsVODlTwGGnO72vOThT8t7PX5HyB4K8N6NJpV3plvpcEkd89oZLglW8pVK3EscceD85mdt7H5iVVtwBIP88ckHScIK3MnZr/Ff5/mf0tRqzhpNRhFXUrrdtO76b7an1DPp1/4hsrCylnki0y3S3hkt42I+0JCEVkcdAH2gsBxgYwcV3rDVcf7KM5yjSg4pxu7NL0dvU4JYyhgZVZ04xlUlzNS926vr2/D9TsotH0bT4IjHaWqBcISNvmARoFcMCuEWTI6NuZFck4+U/SrL8uw1OP7uKaiuiu+v5/8OfOVszzPGTa9pNRu+XlbtZPt5O/kfOXx70TRNd8I3MQjiSazdLi2uAI2Fs0spSQqCCBEVkbcgwGjJVuOnkZjKg+SNFJNvljyq/vP4Y97y6Hp4L63bmxDcoRV3dNe6vin6Lq7+qP4ov8Agqh8CtT8G/H2N9StmsbjxFd6BqkKSxyQM1qbKKC31F1lKCEjNvOBuUL5iI4JlUV+zcHUquHy3kxcHSlOmuWM9JReu6avro7dbn47xc6GNzBPBVI1I+2lGUo6xdknKzV7pbN7X0tc+TItT8I6l4n8OeC/DN5Fu0a4sbjV7mKGI2NnaaHbtczIbhSVgjgQtBDHBCm+/wBRZ5GiSJI4voJz9hRnKXxtWUuurso23vre66HkKhSrVaFCi03Tk51VHVJJX3tb5v59jkPF1lp/ibxjpek6dbGWe9vdOi1eaZQRHo4v1eSOeZd2PtL20EDE7VjtdMm3J5M43OjJUaT9p8bU7PvorO3z/MxqUHiMRH2UHJc8XJ9IpSkuXSybffujY8KaR9n8fxWiH7Fd3HiDULOa5+RYYRPdR2d880y7Ght1t5JriV3G2KKV1Zl8l/K6I2eBXN1U2/7zs7fc1c6IJU8fycrVpxmmns42sv1/U/0Sf2K7E+Bvhp8C7bVrZ7K41b4WWWh3SIJJYxqPhyzsLpYyAWBZTJrc8JDENA7vGqKwFdOV03QxFGT0WKoyu9lzwel0/K6+R5Wd1vrOHxkLudTCYiNSmtdIVot1P/Jkn8z9OI44pokfarHyjtYqAQGQcjoeQeCfXuOv1Mb8qSer1v2s+vqfARqS1bWm9vVl8wK0ZPOGy2D6Htkbeg6HGe/JrVbW772Jdm7207X/AK9TMbS4SxJhySSclQScnOSTGSc9cknPrVqU/wDn419wc0vJ+birv18zyYMkV/Y2aAJlZ5mCjhktoxGgGf4BLKFHqY/ujpXjVZe+oN6pc3lba3e/4GlCny05zSXKlyJLpbbf/hzWvV3Dbk7ImTj1IwB39MA4/iz+Obi2426P/I2b9nByfXt8zbsbd2jjUIWYbQQATtL8KWwMLkkL1wGOPp0Ri1aNtX16K+hyuWvNe333sXLuwngkjtnYPPKUQCMllzIyqOcDLoHLHAIyvXHNOMHBtNr5eVyHJyldaLs/P+rnxb+1JdRa38SrXQIx/o/gXwjaaZFt+4mo+J5otW1NSM4LjT9O8P8AHPySfNg4Ffz94tZj7XNcHl9ObtgqDrNX0desr3sm/hjpsnfyP6b8IcsjhcgxWYShaWPxPs1J7vD4dJWvbeVRXXS3ZngfhKI6bcx2mNj7ztX5QJF3bj5SBdxK5O8ktwo5A+WvyjC1XzRUr2k9PLrqunyP1DEuU4NrS/8AwbH0FZ6j9jtlO4byTs3Y2qMcyPnaFRc8kkZOB3r6mlXp0KWu71Vradddb7I+bq0Z1q0Yq9ktfPv/AFt5GHqniV5C0FrI2Au5m2clzkHknlmbAY+vbIAHJicxlUg1C7t8T6r8evft8jrwuAUJpysk3on1s9beejdvLc7T4a/DSDxDBdeNvGMCS6Bo5Mmn2V4ALbUtTtwQs8wbcHsNOuMNINpSa7VVy0drPG/6F4e8Jyxs5Z5nFFPB0Gnh6E0/9oqXfLUd1Z8mjjbfyZ+deInGTwFsgyir/tVaHNiK8GnKhT05qSad/f8AtaWvc/jA/wCDifWNYi+N3gD+yIru2uPGWheKNXtbwkQrb6NpUuk6Q0UGEBiml+yTXMi72MMNyxOzzmYfpc6UXjakZO0YP2tmrOSslGyV1ZKNtXsr+v53Ku44GjKn1ThJptuLercXvdttu+v6/gx8HbPxBpN472th/adxfWMllbRG68qG4N9IEeeZx+8l+ziR5JkUtJIv7g7fNbJUr4adajOo7QhO7UrJPTSPa97PsGXwxMYVYU05znHljNN+01d3J6bLbRvXofauheEdP8GrLq2pKkUemw/2truqzAfaZTbCJ7uU/OJhl2gtIdzvH5UvlQ+Y6SCTJxnWrzq1U4U7Pk/kae1vlvY+gpKnh6UYxkuZWlOT3ukuZPS/fyOG+Gpj1bx5NdXReL+2Rqt7ZxSsimJrmC5mmUyY5mu7rFmpXpJB8hdZUFehTpp0Y82kI829+qt6Wf69Dw/byljZ1IfvFJ2u76W7Lv0P9ETw5qMOmfs5/AbxDtSK40bxXoVpNKkjYktfEfii88OiGSeMsRG6a8kUanzFdAEEJ429te8MFga1NxtRrq9vilGTcbLS28k99vx4qE6dTM81o1VeNbBy5X0jUhFNOV7PZNK12mz778Gsx0WOUyvNBm58p3LHy086UKuSBhAmFUHK5GQQW2r9BR0jZ66K3lf3v+B/wD4as489ovZtSXfd/mjsI5ULpGGDK8W5WHAJUAEA/p65B4rRvpezexkPyBxluOOCMfh7U/e8vxA+cLq+8nxpo9iSN8tioI9WmuBJJn6dP90DPAGPBqS/2vlv9jRf1/Wh6eHpP+zJz0vz/hf+megwQfar2ytTyJ763EpHUwrL5knzf7i/ka6YK8l5NN/Jo5K7/dpd7L8P+CenTCL7bY2VuiRxoZbuVYgFAWFGZAwGNwMgBOeMgHrXfzRck0tkr6HE27W/ryMuzQXviGLksls7zk9R5iZ8tfxbAz64rKT95v8A4fqVBXnCHWaVu3Z3eyZ+b/iW5Xxh4x8Y+J4nM0OueKNXltpMnDafZTjR9PdCP4Dp2m2rJ6q5YABsV/JXFeLlmfEOaYrSSjXlCi+jpxajH7rP7u5/ZnDOH/szhzJ8vcVBxwdOtUta/tZq8r2dru/z/ExLiwg06SS72Y+zqJCwj3FIhjzPlUguWTe4CncWAABYgjw1h4pqduWzu/n2+89Gri0qfLJxi2m9dOtvlb8/uNm41S1ewhmhkc29xbLNC7AIWgkUNGzZLEAqwZhknLrgnGa6K8qahF8z1V7av+v60OfC+0lWu4qSjdNp6P0fZ9PwuaXgPQJPGfiGx8O6UhM9+wmvrxEEi6bpUUmbu9YSggGMOkMAb5Wu5olYFFOPa4XyOWfZlh8HBN0+dTxMukKClrKTd7Xd0t7s8fizPY5Bl2IxsnHnknDCwv7067jZRjG9/d+JvotT62+I0X2XTdL+H/hyNILO2sopL5IgV8uwhMKQRO2Sd11Ou55GA3ndn5pCa/qL6vSwuFo4PCwUKWGpxh7O3KnyJLmv1crXf+Z/LyxM8XXrY7FTlKtias5zqNuTUZSbcF5RbSS2flsfzRf8F5/2ZfDnxH+GHhn4ixwJp/ij4RR6jrFrrEQijFvo2oLYQ+IbO9QAi+spY9P0248jdvt1tL2YCNZJS/zOcTqUqsK1J2nOCjJa2vzPRPro9T6XJIrE4erSqtOnTnKUW3rays316f8AAP5Qvht4PvbOYy2NqLq1Dw3OnwwTk2+pW4UrJ/ZVxMVtzqdrKDixZoZby08uEDdZ3cteTKSbiqyvCas1bWNR25bLy762PosLQcLTpySlC8k01aUV9mXRO+y6naeIvFM3i66stI0iwuP7JvXmPiS28z/TEvbOWNo5nVwPK06OQxar9gbzZpppJ0uygs4ooO51JLD/AFdttQ95T6tPaPysXOf1ispxgouV4Tp9G1pd7b6t9LI53wwE0n4haVoV1GYmW2t7+1hjLBlt4xb3qQn5mdo4pLtXK9i1wrjaA49fD1FPL2+VOaTi1/dS3Xns7HjuHscxUVHks78i+F303/Pyv8/78PButzat8M/2Zvhdbh5Z77w34O+KviZgfMWx0rw8LXxHZRXW471uL7xRLpltDvAaWK3uiMGCYDonJTWX4KCvHStU6JRW3zu9tzzalNwlm2YStF+0eDpxUk1KdoSk0/5VG65tr6b3P1J+HE7/APCNQRScxu8igEA/I00hAAPJU5GB1IxwDX0FG/KnvdNdtV/wP1Pi58qqarrJvXu9Nvnc6CR7hCZrRkmS3bEtoFJxsJBaNy+QxHyk7QvZsAb2OZqd30ev5ByRavFatab7p+o8a5p5ALNMjfxIbeclD3UlYypKngkEjjg4rX2kfP7iOV+R82amT/wtjQFyceRMMZOMeWeMdMV82/8Afl/h/RnsYf8A5FM/8f6ntGi/8huy9jMfytjj8q9Olv8Ad+aPLxHwx9Y/md5CT/aVye405sHuOYOh7V0x+P7jkl8S+X6lfQP+PnVD3FrIQe4IVyCD1Bzzn1qOlb/r1V/BO33HRh0nXpJpP/aKC17OSv8Af1PzX8IgDQdGwAM6dbMcDqzRjLH1J7nqe9fyE0nUqtpNuvUu3q3773vuf2niPdclHRKFBJLRJckNktvkcz8W5pbf4deKp4JZIJktbYpNC7RyoRqFtgrIhV1I9iK0STTuk+mqWx5eL2X+F/8ApZ574Mnnl+H/AIYaWaWRvsdym6SR3bZFqdxHGuWJO2ONVjReiIqqoCgCvDxuk7Lbn2PZwCXJsvhXT0PuT9khEfVPHsrorSpaeHIkkZQ0iRvJrLvGrkFlR3jjZ0BCs0aMQSqkfuPg3GLjm83GLl7KEeZpc3LdPlvva+tr2ufinjJOar5NBSkoWqT5OZ8vNZrm5b25rdbX8z2a4AfxV4uZwGZbbTVVmG4qvnWx2gnJAzzgcZr9hltPzivyPx5aUY200Wx+QX/BWO2t5/2Y/iAk8EMySTaPDIksSSLJDceKNCt7iJ1dSGingkkhmjYFZYneNwyMwPzGbpWw/wDiX5s+j4eb5q2r/hy6+UT+FT4FTSzfCnxlFNLJLFbW17PbRyu0kdvNbeY1vNAjkrFLAyq0MkYV4mVShUgV4WL/AI9P/t380fYZX/utTyqyS9Oxu/Dp3/4Wvdje2J/KecbjiZ7kaY9y8oz+8a4d3ednyZWdmkLFiT3T2j6P8jnptrEVLNrRbP1KOngH43eGMgHB0gDIBwHsY1cD2dQFYfxKADkV6OE/gJdOZ6GOJ/5GC/69fpI/vu+DUca65ZMsaKY/hZ8MoIyqqDHAvh65lWFCBlIhJJJII1wgd3cDczE+jhv959KcLeXuvbsfP5m2svp2bV8RWb83davu/M/T3wCT/wAI9ZfVv/Rste7R+CHrI+Jfxv5mvAT/AGtdrk7cxHb2yVQk46ZzznrUy+J/4n+bOmn8P3/+lG08MO9/3Uf3m/gX1PtQS1q/UP/Z"
          />
        </div>
        <div className="profile-details-container-3">
          <div>
            <p className="profile-text-1">Your Name</p>
            <p className="profile-text-value">{name}</p>
          </div>

          <div>
            <p className="profile-text-1">Email</p>
            <p className="profile-text-value">charlenereed@gmail.com </p>
          </div>

          <div>
            <p className="profile-text-1">Date of Birth</p>
            <p className="profile-text-value">{dateOfBirth}</p>
          </div>

          <div>
            <p className="profile-text-1">Permanent Address</p>
            <p className="profile-text-value">
              {JSON.stringify(permanentAddress)}
            </p>
          </div>

          <div>
            <p className="profile-text-1">Postal Code</p>
            <p className="profile-text-value">{JSON.stringify(postalCode)}</p>
          </div>
        </div>

        <div className="profile-details-container-3">
          <div>
            <p className="profile-text-1">User Name</p>
            <p className="profile-text-value">{name}</p>
          </div>

          <div>
            <p className="profile-text-1">Password</p>
            <p className="profile-text-value">*********</p>
          </div>

          <div>
            <p className="profile-text-1">Present Address</p>
            <p className="profile-text-value">
              {JSON.stringify(presentAddress)}
            </p>
          </div>

          <div>
            <p className="profile-text-1">City</p>
            <p className="profile-text-value">{JSON.stringify(city)}</p>
          </div>

          <div>
            <p className="profile-text-1">Country</p>
            <p className="profile-text-value">{JSON.stringify(country)}</p>
          </div>
        </div>
      </div>
    )
  }

  renderAllTransactionView = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTransactionView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onChangePageView = id => {
    this.setState({activeId: id})
  }

  render() {
    const {
      activeId,
      city,
      country,
      dateOfBirth,
      id,
      name,
      permanentAddress,
      postalCode,
      presentAddress,
    } = this.state
    console.log(
      activeId,
      city,
      country,
      dateOfBirth,
      id,
      name,
      permanentAddress,
      postalCode,
      presentAddress,
    )
    return (
      <div className="bg-container-2">
        <UserSideBar />

        <div className="Transaction-Header-container-2">
          <div className="tr-container-2">
            <h1 className="accounts-text-4">Profile</h1>
            <AddTransactionHeader />
          </div>

          <div className="profile-container-el">
            {this.renderAllTransactionView()}
          </div>
        </div>
      </div>
    )
  }
}

export default UserProfilePage
