from flask import Flask
from flask_cors import CORS, cross_origin
from flask import request
import pika

app = Flask(__name__)
CORS(app)
connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()
channel.queue_declare(queue='membershipdetails')

def getMemberDetails(memberType):
	dict = {"Gold":"You a Gold member. Monthly charges - $ 30, Discount on purchase - 30 %, Fixed rental on each book- $ 10", "Silver":"You a Silver member. Monthly charges - $ 20, Discount on purchase - 20 %, Fixed rental on each book- $ 10", "Platinum":"You a Platinum member. Monthly charges - $ 35, Discount on purchase - 35 %, Fixed rental on each book- $ 10"}
	return dict.get(memberType)

def on_request(ch, method, props, body):
    print(" [.] fib(%s)" % body)
    response = getMemberDetails(body)

    ch.basic_publish(exchange='',
                     routing_key=props.reply_to,
                     properties=pika.BasicProperties(correlation_id = props.correlation_id),
                     body=str(response))

    ch.basic_ack(delivery_tag = method.delivery_tag)

channel.basic_qos(prefetch_count=1)
channel.basic_consume(on_request, queue='membershipdetails')
print(" [x] Awaiting RPC requests")
channel.start_consuming()

if __name__ == '__main__':
	app.run(threaded= True)