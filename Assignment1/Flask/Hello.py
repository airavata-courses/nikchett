from flask import Flask
from flask_cors import CORS, cross_origin
from flask import request

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
	membershiptype = request.args.get('membershiptype')
	print membershiptype
	dict = {"Gold":"You a Gold member. Monthly charges - $ 30, Discount on purchase - 30 %, Fixed rental on each book- $ 10", "Silver":"You a Silver member. Monthly charges - $ 20, Discount on purchase - 20 %, Fixed rental on each book- $ 10", "Platinum":"You a Platinum member. Monthly charges - $ 35, Discount on purchase - 35 %, Fixed rental on each book- $ 10"}
	return dict.get(membershiptype)




if __name__ == '__main__':
   app.run(threaded= True)