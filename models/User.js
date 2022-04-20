username
>> String
>> unique
>> required
>> trimmed

email
>> String
>> required
>> unique
>> match valid email (mongoose validation)

thoughts
>> array of _id values referencing Thought model

friends
>> array of _id values referencing User model
