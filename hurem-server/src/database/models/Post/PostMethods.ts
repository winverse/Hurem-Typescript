import models from 'database';

interface Write {
	count: number;
	userId: string;
	content: string;
	displayname: string;
}

interface List {
	cursor?: string;
	userId?: string;
	self?: string;
}

interface IPostMethods {
	write({ count, userId, content, displayname }: Write): any;
}

export default class PostMethods implements IPostMethods {
	Posts = models.Post;

	write({ count, userId, content, displayname }: Write): any {
		const { Posts } = this;
		return Posts.build({
			count,
			content,
			fk_user_id: userId,
			displayname
		}).save();
	}

	list({ cursor, userId, self }: List) {
		const { Posts } = this;
		const query = Object.assign(
			{},
			cursor ? { id: { $lt: cursor } } : {},
			userId ? { fk_user_id: userId } : {}
		);

		return Posts.findAll({
			where: query,
			order: [
				['createdAt', 'DESC']
			],
			limit: 20,
			raw: true
		});
	}
}