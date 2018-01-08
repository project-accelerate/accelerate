const gulp = require('gulp')
const path = require('path')
const fs = require('fs')
const babel = require('gulp-babel')
const shell = require('gulp-shell')
const { execSync } = require('child_process')

const moduleTasks = []
const moduleBuildTasks = () => moduleTasks.map(x => x.build)
const moduleWatchTasks = () => moduleTasks.map(x => x.watch)

const SCHEMA_PATH = './modules/api/schema.graphql'


/** Module definitions */
defineModule('api')
defineModule('api-interface')


/** Compile frontend queries */
gulp.task('frontend:graphql:build', shell.task([
  `relay-compiler --src ./modules/frontend --exclude **/.next/** **/node_modules/** **/test/**  **/__generated__/** --schema ${SCHEMA_PATH}`
]))

/** Compile frontend queries when frontend source changes */
gulp.task('frontend:graphql:watch', shell.task([
  `relay-compiler --watch --src ./modules/frontend --exclude **/.next/** **/node_modules/** **/test/**  **/__generated__/** --schema ${SCHEMA_PATH}`
]))

/** Build frontend for production */
gulp.task('frontend:build', [...moduleBuildTasks(), 'frontend:graphql:build'], shell.task([
  'next build'
], { cwd: 'modules/frontend' }))

gulp.task('frontend:serve-dev', [...moduleBuildTasks(), 'frontend:graphql:build'], shell.task([
  'node server.js'
]))

/** Start devserver running the frontend and auto-rebuilding modules on change */
gulp.task('frontend:watch', [
  ...moduleWatchTasks(),
  'frontend:graphql:watch',
  'frontend:serve-dev'
])


/** Start up the frontend in dev mode */
gulp.task('frontend:watch', [
  ...moduleWatchTasks(),
  'frontend:graphql:watch',
  'frontend:serve-dev'
])


/** Postinstall setup */
gulp.task('setup', () => {
  fs.readdirSync('modules').forEach((moduleName) => {
    process.stderr.write(`\n\n*** Setup ${moduleName} '***\n\n`)
    const modulePath = path.join('modules', moduleName)

    execSync('npm install --prefer-offline', { cwd: modulePath })
  })
})

/** Local dev setup */
gulp.task('dev-setup', ['setup'], () => {
  fs.readdirSync('modules').forEach((moduleName) => {
    const modulePath = path.join('modules', moduleName)
    execSync(`node_modules/.bin/linklocal -- ${modulePath}`, {
      stdio: 'ignore'
    })
  })
})


/** Build all modules for production */
gulp.task('build', [...moduleBuildTasks(), 'frontend:build'])

gulp.task('default', ['frontend:watch'])


/** Define build tasks for a module and add them to the list of module build tasks */
function defineModule(name) {
  const sourceFiles = `modules/${name}/src/**/*.js`

  moduleTasks.push({
    build: `${name}:build`,
    watch: `${name}:watch`,
  })

  gulp.task(`${name}:build`, () => gulp
    .src(sourceFiles)
    .pipe(babel())
    .pipe(gulp.dest(`modules/${name}/.build`))
  )

  gulp.task(`${name}:watch`, [`${name}:build`], () => {
    gulp.watch(sourceFiles, [`${name}:build`])
  })
}
