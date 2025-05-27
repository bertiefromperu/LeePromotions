from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)

@app.route('/')
def start():
    # Change landing page to Home.html
    return redirect(url_for('home'))

@app.route('/Home')
def home():
    return render_template('Home.html')


@app.route('/Privacy_Policy')
def privacy_policy():
    return render_template('Privacy_Policy.html')

if __name__ == '__main__':
    app.run(debug=True)

