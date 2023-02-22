import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { registerUser} from "../../store/actions/authActions"
import Error from "../Error"



const RegisterPage = () => {
  const [customError, setCustomError] = useState(null)

  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  )
  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  useEffect(() => {
    if (success) {
      navigate('/login')}
    }, [navigate, userInfo, success])
    
    const submitForm = (data) => {
      // check if passwords match
      if (data.password !== data.confirmPassword) {
        setCustomError('Password mismatch')
        return
      }
      // transform email string to lowercase to avoid case sensitivity issues in login
      data.email = data.email.toLowerCase()
      
      dispatch(registerUser(data))
      
      //se le envia data pero no le termina de gustar

  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {error && <Error>{error}</Error>}
      {customError && <Error>{customError}</Error>}
      <div className='form-group'>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          className='form-input'
          {...register('name')}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          className='form-input'
          {...register('email')}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          className='form-input'
          {...register('password')}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='email'>Confirm Password</label>
        <input
          type='password'
          className='form-input'
          {...register('confirmPassword')}
          required
        />
      </div>
      <button type='submit' className='button' disabled={loading}>
        {loading ? 'Loading...' : 'Register'}
      </button>
    </form>
  )
}

export default RegisterPage