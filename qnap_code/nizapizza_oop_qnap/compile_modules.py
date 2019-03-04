GlobalVariables = ['GlobalVariables.qnp']

ObjectDefinitions = ['./Host/Object.qnp', './LineaHR/Object.qnp', './LineaTH/Object.qnp', './Router/Object.qnp', './Via/Object.qnp', './Terminal/Object.qnp', './Packet/Object.qnp', './Webapp/Object.qnp', './Software/Object.qnp']

Procedures = ['./Host/Procedures.qnp']

Stations = ['./Software/Stations.qnp', './Terminal/Stations.qnp', './Host/Stations.qnp', './LineaHR/Stations.qnp', './LineaTH/Stations.qnp', './Router/Stations.qnp', './Via/Stations.qnp' ]

Footer = ['End_Of_Code.qnp']

filenames = GlobalVariables + ObjectDefinitions + Procedures + Stations + Footer


with open('./build/please_work.qnp', 'w') as outfile:
    for fname in filenames:
        with open(fname) as infile:
            outfile.write(infile.read())