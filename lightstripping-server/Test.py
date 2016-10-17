from flask import Flask, request
from flask_restful import reqparse, abort, Api, Resource
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)

CONFIGS = [
    {'id': 0, 'name': u'Test 0'},
    {'id': 1, 'name': u'Test 1'},
    {'id': 2, 'name': u'Test 2'}
]

activeConfig = CONFIGS[0];


def abort_if_config_doesnt_exist(config_id):
    if len(CONFIGS) <= int(config_id):
        abort(404, message="Config {} doesn't exist".format(config_id))

parser = reqparse.RequestParser()
parser.add_argument('id')


# Config
# shows a single config item and lets you delete a config item
class Config(Resource):
    def get(self, config_id):
        abort_if_config_doesnt_exist(config_id)
        return CONFIGS[int(config_id)]

    def delete(self, config_id):
        abort_if_config_doesnt_exist(config_id)
        del CONFIGS[int(config_id)]
        return '', 204

# Active
# shows the active config and lets you set it
class ActiveConfig(Resource):
    def get(self):
        return activeConfig
    
    def post(self):
        global activeConfig
        args = parser.parse_args()
        id = args['id']
        activeConfig = CONFIGS[int(id)]
        return activeConfig, 201

# ConfigList
# shows a list of all configs, and lets you POST to add new configs
class ConfigList(Resource):
    def get(self):
        return CONFIGS

    # def post(self):
        # CONFIGS.append(request.data)
        # return CONFIGS[len(CONFIGS)-1], 201

##
## Actually setup the Api resource routing here
##
api.add_resource(ConfigList, '/configs')
api.add_resource(Config, '/configs/<config_id>')
api.add_resource(ActiveConfig, '/active')


if __name__ == '__main__':
    app.run(debug=True)