package com.login;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

import org.hibernate.validator.internal.util.privilegedactions.GetConstraintValidatorList;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.Consumer;
import com.rabbitmq.client.DefaultConsumer;
import com.rabbitmq.client.Envelope;

@SpringBootApplication
public class Login {
	final static String RPC_QUEUE_NAME = "login";

	{
		System.out.println("home");
		ConnectionFactory factory = new ConnectionFactory();
		factory.setHost("localhost");

		Connection connection = null;
		try {
			System.out.println("try");
			connection = factory.newConnection();
			final Channel channel = connection.createChannel();

			channel.queueDeclare(RPC_QUEUE_NAME, false, false, false, null);

			channel.basicQos(1);

			System.out.println(" [x] Awaiting RPC requests");

			Consumer consumer = new DefaultConsumer(channel) {
				@Override
				public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties,
						byte[] body) throws IOException {
					System.out.println("handleDelivery");
					AMQP.BasicProperties replyProps = new AMQP.BasicProperties.Builder()
							.correlationId(properties.getCorrelationId()).build();

					String response = "Default";
					try {
						String message = new String(body, "UTF-8");
						System.out.println(message);
						response = getMemberDetails(message);
						// response = "Java response";
					} catch (Exception e) {
						System.out.println(" [.] " + e.toString());
					} finally {
						channel.basicPublish("", properties.getReplyTo(), replyProps, response.getBytes("UTF-8"));
						channel.basicAck(envelope.getDeliveryTag(), false);
					}
				}
			};

			channel.basicConsume(RPC_QUEUE_NAME, false, consumer);

			while (true) {
				try {
					Thread.sleep(100);
				} catch (InterruptedException _ignore) {
				}
			}
		} catch (IOException | TimeoutException e) {
			e.printStackTrace();
		} finally {
			if (connection != null)
				try {
					connection.close();
				} catch (IOException _ignore) {
				}
		}
	}

	private static String getMemberDetails(String jsonCreds) throws JSONException {
		MemberData member = new MemberData();

		JSONObject jsonObj = new JSONObject(jsonCreds);

		String username = jsonObj.getString("username");
		String password = jsonObj.getString("password");

		if (member.memberIsPresent(username) && member.loginCredentialsVerify(username, password)) {
			
			Member memberResult = member.getMemberDetails(username);
			memberResult.setCurrentIssue(getCurrentIssue(memberResult.getMemberId()));
			return memberResult.toString();

		} else {
			// if invalid credentials send error response
			// response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return "no";
		}
	}

	private static String getCurrentIssue(int memberId) {
		RPCClient currentIssue = null;
		String response = null;
		try {
			currentIssue = new RPCClient();

			System.out.println(" [x] Requesting fib(30)");
			response = currentIssue.call("" + memberId);
			System.out.println(" [.] Got '" + response + "'");
		} catch (IOException | TimeoutException | InterruptedException e) {
			e.printStackTrace();
		}

		return response;

	}

	public static void main(String args[]) throws Exception {
		SpringApplication.run(Login.class, args);
	}
}

