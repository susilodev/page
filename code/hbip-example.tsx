import React from 'react'
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form'
import axios from 'axios'
import sha1 from 'sha1'

// Definisikan tipe untuk input form
interface IFormInput {
  password: string
}

function PasswordCheckForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>()

  // Fungsi untuk memvalidasi password menggunakan HIBP
  const checkPassword = async (password: string): Promise<boolean> => {
    // Hash kata sandi menggunakan SHA-1
    const hashedPassword = sha1(password)
    const prefix = hashedPassword.substring(0, 5) // 5 karakter pertama
    const suffix = hashedPassword.substring(5) // Sisa karakter

    try {
      // Kirim prefix ke HIBP API
      const response = await axios.get(
        `https://api.pwnedpasswords.com/range/${prefix}`,
      )
      const hashes = response.data.split('\n')

      // Cek apakah suffix ada dalam daftar hash yang dikembalikan
      const found = hashes.some((hash) => {
        const [hashSuffix] = hash.split(':')
        return hashSuffix.toLowerCase() === suffix.toLowerCase()
      })

      return found
    } catch (error) {
      console.error('Error checking password:', error)
      return false
    }
  }

  // Handler untuk submit form
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const isPwned = await checkPassword(data.password)

    if (isPwned) {
      setError('password', {
        type: 'manual',
        message:
          'Password telah ditemukan dalam pelanggaran data, gunakan kata sandi lain!',
      })
    } else {
      alert('Password aman!')
    }
  }

  const onError = (errors: FieldErrors<IFormInput>) => {
    console.error('Validation Errors:', errors)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          {...register('password', { required: 'Password wajib diisi' })}
          aria-invalid={errors.password ? 'true' : 'false'}
        />
        {errors.password && (
          <p style={{ color: 'red' }}>{errors.password.message}</p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Checking...' : 'Submit'}
      </button>
    </form>
  )
}

export default PasswordCheckForm
