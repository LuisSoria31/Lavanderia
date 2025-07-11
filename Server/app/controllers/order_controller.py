from app.database.db import db
from app.models.order import Order
from app.models.garment import Garment
from app.models.order_detail import OrderDetail
from app.models.service import Service

def create_order(client_id, user_id, estimated_date, total_price):
    order = Order(
        client_id=client_id,
        user_id=user_id,
        estimated_delivery_date=estimated_date,
        total=total_price)
    db.session.add(order)
    db.session.commit()
    return order

def add_service(name, price, description):
    service = Service(
        name=name,
        price=price,
        description=description)
    db.session.add(service)
    db.session.commit()
    return service  

def add_garment(order_id, type, description, notes):
    garment = Garment(
        order_id=order_id,
        type=type,
        description=description,
        observations=notes)
    db.session.add(garment)
    db.session.commit()
    return garment  

def create_order_detail(garment_id, service_id, quantity):
    order_detail = OrderDetail(
        garment_id=garment_id,
        service_id=service_id,
        quantity=quantity)
    db.session.add(order_detail)
    db.session.commit()
    return order_detail

def get_order_detail(order_id):
    #La busqueda que haremos deber traer:
    #Cliente, garments
    #Cada garment con sus servicios
    order = Order.query.get(order_id)
    print("Orden", order.to_dict())
    order_data = {
        'order_id': order.id,
        'client': order.clients.name,
        'state': order.state,
        "garments": []
    }
    garments = Garment.query.filter_by(order_id=order.id)
    for garment in order.garments:
        print("Garment", garment.to_dict())
        garment_data = {
            'type': garment.type,
            'description': garment.description,
            'observations': garment.observations,
            'services': []
        }

        for gs in garment.order_detail:
            service = Service.query.filter_by(id=gs.service_id)
            print("Service",service.to_dict())
            service_data = {
                'name': gs.name,
                'description': gs.description,
                'price': gs.price
            }
            garment_data['services'].append(service_data)
        order_data['garments'].append(garment_data)
    return order_data

def update_order_status(order_id, new_status):
    order = Order.query.get(order_id)
    if not order:
        return None
    order.state = new_status
    db.session.commit()
    return order

def list_orders_by_status(status):
    orders = Order.query.filter_by(state=status).all()
    data=[{
        'id': o.id,
        'client_id': o.client_id,
        'state': o.state,
        "estimated_delivery_date": o.estimated_delivery_date,
        'total': o.total,
        "pagado": o.pagado,
    } for o in orders]
    return data