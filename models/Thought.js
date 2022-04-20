const { query } = require("express")

thoughtText
>> String
>> required
>> between 1 - 280 characters

createdAt
>> Date
>> set value to current timestamp
>> use a getter method to format the timestamp on query

reactions
>> array of nested documents created with the reactionSchema

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });