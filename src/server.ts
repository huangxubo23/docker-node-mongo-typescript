import app from './app'

/**
 * Error Handler. Provides full stack - remove for production
 */
// app.use(errorHandler());

/**
 * Start Express server.
 */
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  // console.log(`  Server running at http://localhost:${port}`)
  console.log(
    '  Server is running at http://localhost:%d in %s mode',
    port,
    app.get('env')
  )
  console.log('  Press CTRL-C to stop\n')
})

export default server
