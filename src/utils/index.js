/**
 *
 * @param {Object} file 瀛湖选择图片的file对象
 * @returns Promise对象
 */
export function resolveBase64(file) {
  return new Promise((resolve) => {
    const fr = new FileReader()
    fr.readAsDataURL(file)
    fr.onload = (e) => {
      resolve(e.target.result)
    }
  })
}
