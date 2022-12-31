<template>
	<div class="container">
		<h2>Running locally your own instance with backend</h2>
		<h3>
			This means you are going to host your own instances of both <code> .Net Core Api</code> and
			<code>Vue.js</code> app.
		</h3>

		<div class="card text-dark bg-light mb-3">
			<div class="card-header">Prerequisites and Downloads</div>
			<div class="card-body">
				<h5 class="card-title">
					In order to run <code>.Net Core Api</code> project you are going to need Visual Studio.
				</h5>
				<p class="card-text">Clone or download .zip archives of boilerplate projects:</p>
			</div>
			<div class="card-footer bg-transparent">
				<ul class="list-group">
					<li class="list-group-item">
						<b>Vue.js - </b>
						<a href="https://github.com/Uraharadono/Vue3WebpackBoilerplateV2"
							>https://github.com/Uraharadono/Vue3WebpackBoilerplateV2</a
						>
					</li>
					<li class="list-group-item">
						<b> .Net Core API - </b>
						<a href="https://github.com/Uraharadono/Net7CoreApiBoilerplate"
							>https://github.com/Uraharadono/Net7CoreApiBoilerplate</a
						>
					</li>
				</ul>
				and extract them to some folder.
			</div>
		</div>

		<div class="alert alert-warning" role="alert">
			Basic premise to run them is to read <b>readme</b> in both of these projects. I have written
			below more in depth guide, but there should be no need really for it.
		</div>

		<div class="card text-dark bg-light mb-3">
			<div class="card-header">Running the apps</div>
			<div class="card-body">
				<ol class="list-group list-group-numbered">
					<li class="list-group-item d-flex justify-content-between align-items-start">
						<div class="ms-2 me-auto">
							<div class="fw-bold text-start">
								Open up the folder where you have extracted
								<code> Vue3WebpackBoilerplateV2 </code> project with either Visual Studio Code or
								simply run CMD here.
							</div>
							<ol class="list-group list-group-numbered text-start">
								<li class="list-group-item">
									Install package dependencies by running the command <code>npm install</code>.
								</li>
								<li class="list-group-item">
									After package dependencies have installed run command <code>npm run build</code>.
								</li>
								<li class="list-group-item">Url should be <code>http://127.0.0.4:8080/</code></li>
							</ol>
							<i class="text-start">IF URL IS NOT <code>http://127.0.0.4:8080/</code></i
							>:<br />
							in <b>CoreApi project</b> change <code>appsettings.json</code> ->
							<code>ClientBaseUrl</code> property to your url. (make sure to restart your dev
							server)
						</div>
					</li>

					<li class="list-group-item d-flex justify-content-between align-items-start">
						<div class="ms-2 me-auto">
							<div class="fw-bold text-start">
								Open up the <code> Net7CoreApiBoilerplate </code> project.
							</div>
							Make sure that you have .Net 7 tools installed (in VS), and to restore nugget packages
							if VisualStudio doesn't restore them automatically (highly unlikely)
						</div>
					</li>

					<li class="list-group-item d-flex justify-content-between align-items-start">
						<div class="ms-2 me-auto">
							<div class="fw-bold text-start">Run migrations.</div>
							<ol class="list-group list-group-numbered text-start">
								<li class="list-group-item">
									Open npm console (Visual studio: View -> Other windows -> Package Manager Console)
								</li>
								<li class="list-group-item">
									On top of the <b>Package Manager Console</b> set
									<code>Default Project:</code> dropdown to
									<code> Net7CoreApiBoilerplate.DbContext </code>
								</li>
								<li class="list-group-item">
									Type command: <code>Update-Database</code> to EF Core run migrations
								</li>
							</ol>
						</div>
					</li>

					<li class="list-group-item d-flex justify-content-between align-items-start">
						<div class="ms-2 me-auto">
							<div class="fw-bold text-start">
								Finally start <code> Net7CoreApiBoilerplate.Api </code> project.
							</div>
						</div>
					</li>

					<li class="list-group-item d-flex justify-content-between align-items-start">
						<div class="ms-2 me-auto">
							<div class="fw-bold text-start">
								Compare IIS url that our API project runs on with Vue project setup.
							</div>
							Our API is setup to run on
							<a href="https://localhost:44335/">https://localhost:44335/</a> url. If this is not
							the case with you you need to change config in your vue.js project.
							<ol class="list-group list-group-numbered text-start">
								<li class="list-group-item">
									Open up the folder where you have extracted
									<code> Vue3WebpackBoilerplateV2 </code> project
								</li>
								<li class="list-group-item">Locate file <b>base.js</b></li>
								<li class="list-group-item">
									Change line 20 from
									<code>development: JSON.stringify('https://localhost:44335'),</code>
									to
									<code>development: JSON.stringify('https://localhost:your_port'),</code>
								</li>
							</ol>
						</div>
					</li>
					<li class="list-group-item d-flex justify-content-between align-items-start">
						<div class="ms-2 me-auto text-start">
							<div class="fw-bold">Now that both projects are running</div>
							Go register your user, click trought playground without any limitations and make sure
							you leave star on both repos 😄😃
						</div>
					</li>
				</ol>
			</div>
		</div>
	</div>
</template>
